import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from 'underscore';
const Conversation = mongoose.model('Conversation');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Conversation.find(query)
    .populate("owner")
    .exec(function (err, result) {
      if (err) return response.sendNotFound(res);
      res.json(result);
    })
};

exports.create = function (req, res) {
  const user = req.locals.user;
  const attrs = _.pick(req.body, "conversationId")
  const item = new Conversation(attrs);
  item.owner = user._id;
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, item);
  });
};

exports.read = function (req, res) {
  Conversation.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "conversationId")
  Conversation.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Conversation.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Conversation.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};
