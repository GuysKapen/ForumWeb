import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from 'underscore';
import Recruitment from '../models/recruitment';

const Apply = mongoose.model('Apply');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  // const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Apply.find({}).populate("owner").exec(function (err, result) {
    if (err) return response.sendNotFound(res);
    res.json(result);
  })
  // Apply.paginate({}, request.getRequestOptions(req), function (err, result) {
  //   if (err) return response.sendNotFound(res);
  //   pagination.setPaginationHeaders(res, result);
  //   res.json(result.docs);
  // });
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

  const attrs = _.pick(req.body, "phone", "cv", "recruitment")
  const item = new Apply(attrs);
  item.owner = user._id;

  Recruitment.findById(attrs["recruitment"], function (err, recruitment) {
    if (err) res.send(err)

    item.save(function (err, item) {
      if (err) return response.sendBadRequest(res, err);

      // Save to recruitments
      recruitment.applies.push(item)
      recruitment.save(function (err, recruitment) {
        if (err) return response.sendBadRequest(res, err);

        // Save to users
        user.applies.push(item);
        user.save(function (err, user) {
          if (err) return response.sendBadRequest(res, err);
          response.sendCreated(res, item);
        });

      });
    });

  });
};

exports.read = function (req, res) {
  Apply.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "phone", "cv", "recruitment")
  Apply.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Apply.remove({ _id: req.params.id }, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json({ message: 'Item successfully deleted' });
  });
};