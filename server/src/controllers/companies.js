import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from "underscore";

const Company = mongoose.model('Company');
const User = mongoose.model('User');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Company.paginate(query, request.getRequestOptions(req), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const item = new Company(company(req, true));
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, item);
  });
};

exports.read = function (req, res) {
  Company.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  Company.findOneAndUpdate({ _id: req.params.id }, company(req), { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Company.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Company.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.request = function (req, res) {
  const user = req.locals.user;
  const item = new Company(company(req));
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    user.company = item._id;
    user.save(function (err, _) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, item);
    });
  });
};

exports.approve = function (req, res) {
  const attrs = { status: true }
  Company.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    User.updateMany({ company: new mongoose.mongo.ObjectId(item._id) }, { "role": "recruiter" }, {}, function (err) {
      if (err) return response.sendBadRequest(res, err);
      res.json(item);
    })
  });
};

function company(req, status = false) {
  return Object.assign(_.pick(req.body, "name", "address", "city", "zipcode", "state", "country"), { status: status });
}