import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from 'underscore';

const Answer = mongoose.model('Answer');
const Post = mongoose.model('Post');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Answer.find(query)
    .populate("post")
    .exec(function (err, result) {
      if (err) return response.sendNotFound(res);
      res.json(result);
    })
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
  const attrs = _.pick(req.body, "answer", "post")

  Post.findById(attrs["post"], function (err, post) {
    if (err) res.send(err)

    const item = new Answer(attrs);
    item.owner = user._id;
    item.save(function (err, item) {
      if (err) return response.sendBadRequest(res, err);

      item.owner = user;
      // Save comment on commentable
      post.answers.push(item._id);
      post.save(function (err, _) {
        if (err) return response.sendBadRequest(res, err);
        user.answers.push(item._id);
        user.save(function (err, _) {
          if (err) return response.sendBadRequest(res, err);
          response.sendCreated(res, item);
        });
      });
    });
  })
};

exports.read = function (req, res) {
  Answer.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "title", "body", "category")
  Answer.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Answer.remove({ _id: req.params.id }, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.detail = function (req, res) {
  Answer.findOne({ _id: req.params.id })
    .populate('category')
    .exec(function (err, item) {
      if (err) return response.sendNotFound(res);
      if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
      res.json(item);
    })
}

exports.related = function (req, res) {
  console.log(req.params);
  Answer.find({ category: req.params.category })
    .exec(function (err, items) {
      if (err) return response.sendNotFound(res);
      res.json(items);
    })
}