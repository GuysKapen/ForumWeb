import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

import _ from 'underscore';

const Post = mongoose.model('Post');
const Answer = mongoose.model('Comment');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Post.paginate(query, request.getRequestOptions(req), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

  const attrs = _.pick(req.body, "title", "body", "category")
  const item = new Post(attrs);
  item.owner = user._id;
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);

    user.posts.push(item);
    user.save(function (err, user) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, item);
    });
  });
};

exports.read = function (req, res) {
  Post.findById(req.params.id, function (err, item) {
    console.log("err", err);
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "title", "body", "category")
  Post.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.delete = async function (req, res) {
  Post.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Post.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.detail = function (req, res) {
  Post.findOne({ _id: req.params.id })
    .populate('category')
    .exec(function (err, item) {
      if (err) return response.sendNotFound(res);
      if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
      res.json(item);
    })
}

exports.related = function (req, res) {
  console.log(req.params);
  Post.find({ category: req.params.category })
    .exec(function (err, items) {
      if (err) return response.sendNotFound(res);
      res.json(items);
    })
}

exports.answer = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
  const { comment, parent, parentType } = _.pick(req.body, "comment", "parent", "parentType")

  let parentModel
  if (parentType === 'post') {
    parentModel = mongoose.model("Post")
  } else {
    return response.sendBadRequest(res, "Invalid request")
  }

  parentModel.findById(parent, function (err, commentable) {
    if (err) res.send(err)

    const item = new Answer({ comment: comment, commentableType: parentType, commentableId: parent });
    item.owner = user._id;
    item.save(function (err, item) {
      if (err) return response.sendBadRequest(res, err);

      // Save comment on commentable
      commentable.answers.push(item._id);
      commentable.save(function (err, _) {
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

exports.approve = function (req, res) {
  const attrs = { status: true }
  Post.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};