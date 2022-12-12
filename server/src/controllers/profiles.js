import mongoose from "mongoose";
import response from "../helpers/response";
import request from "../helpers/request";
import pagination from "../helpers/pagination";

import _ from "underscore";

const Profile = mongoose.model("Profile");

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user))
    return response.sendForbidden(res);
  const query = Object.assign(
    { owner: req.params.userId },
    request.getFilteringOptions(req, ["name"])
  );
  Profile.paginate(
    query,
    request.getRequestOptions(req),
    function (err, result) {
      if (err) return response.sendNotFound(res);
      pagination.setPaginationHeaders(res, result);
      res.json(result.docs);
    }
  );
};

exports.create = async function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

  const attrs = _.pick(req.body, "title", "about", "cover");
  const item = new Profile(attrs);
  item.owner = user._id;
  item.save(async function (err, item) {
    if (err) return response.sendBadRequest(res, err);

    if (user.detail) {
      await Profile.deleteOne(user.profile).exec();
    }

    user.profile = item;
    user.save(function (err, user) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, item);
    });
  });
};

exports.read = function (req, res) {
  Profile.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "title", "about", "cover");
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    attrs,
    { new: true },
    function (err, item) {
      if (err) return response.sendBadRequest(res, err);
      if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
      res.json(item);
    }
  );
};

exports.delete = function (req, res) {
  Profile.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Profile.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};
