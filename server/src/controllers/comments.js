import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from 'underscore';

const Comment = mongoose.model('Comment');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Comment.find(query)
    .populate('commentable')
    .exec(function (err, result) {
      if (err) return response.sendNotFound(res);
      res.json(result);
    })
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
  const { comment, parent, parentType } = _.pick(req.body, "comment", "parent", "parentType")

  let parentModel
  let commentableType
  if (parentType === 'post') {
    parentModel = mongoose.model("Post")
    commentableType = "Post"
  } else {
    return response.sendBadRequest(res, "Invalid request")
  }

  parentModel.findById(parent, function (err, commentable) {
    if (err) res.send(err)

    const item = new Comment({ comment: comment, commentableType: commentableType, commentable: parent });
    item.owner = user._id;
    item.save(function (err, item) {
      if (err) return response.sendBadRequest(res, err);

      // Save comment on commentable
      commentable.comments.push(item._id);
      commentable.save(function (err, _) {
        if (err) return response.sendBadRequest(res, err);
        user.comments.push(item._id);
        user.save(function (err, _) {
          if (err) return response.sendBadRequest(res, err);
          response.sendCreated(res, item);
        });
      });
    });
  })
};

exports.read = function (req, res) {
  Comment.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "title", "body", "category")
  Comment.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.delete = async function (req, res) {
  Comment.findOne({ _id: req.params.id }, async function (err, item) {
    console.log(req.currentUser.id, item.owner);
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Comment.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.detail = function (req, res) {
  Comment.findOne({ _id: req.params.id })
    .populate('category')
    .exec(function (err, item) {
      if (err) return response.sendNotFound(res);
      if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
      res.json(item);
    })
}

exports.related = function (req, res) {
  console.log(req.params);
  Comment.find({ category: req.params.category })
    .exec(function (err, items) {
      if (err) return response.sendNotFound(res);
      res.json(items);
    })
}