import mongoose from "mongoose";
import response from "../helpers/response";
import request from "../helpers/request";
import pagination from "../helpers/pagination";

import _ from "underscore";

const Save = mongoose.model("Save");

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user))
    return response.sendForbidden(res);
  const query = Object.assign(
    { owner: req.params.userId },
    request.getFilteringOptions(req, ["name"])
  );

  Save.findOne(query)
    .populate({
      path: "posts",
      populate: {
        path: "owner",
        populate: {
          path: "profile",
        },
      },
    })
    .populate({
      path: "recruitments",
      populate: {
        path: "owner",
        populate: {
          path: "profile",
        },
      },
    })
    .exec(function (err, item) {
      if (err) return response.sendNotFound(res);
      if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
      res.json(item);
    });
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

  // If not have saved create one
  Save.findOne({ owner: user._id }, function (err, save) {
    let item = save;
    if (item == null) {
      item = new Save();
      item.owner = user._id;
    }

    // Save post or recruitment
    const { post, recruitment } = _.pick(req.body, "post", "recruitment");
    if (post) {
      item.posts.push(post);
    }
    if (recruitment) {
      item.recruitments.push(recruitment);
    }

    item.save(function (err, item) {
      if (err) return response.sendBadRequest(res, err);
      res.json(item);
    });
  });
};

exports.read = function (req, res) {
  Save.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  Save.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, item) {
      if (err) return response.sendBadRequest(res, err);
      if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
      res.json(item);
    }
  );
};

exports.delete = function (req, res) {
  Save.remove({ _id: req.params.id }, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json({ message: "Item successfully deleted" });
  });
};
