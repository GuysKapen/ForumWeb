import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

const Category = mongoose.model('Category');
const Post = mongoose.model('Post');

exports.categories = function (req, res) {
  Category.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.posts = function (req, res) {
  Post.find({}).populate("category").populate({
    path: "comments", populate: {
      path: "owner",
      populate: {
        path: "profile"
      }
    }
  }).populate({
    path: "owner",
    populate: {
      path: "profile"
    }
  }).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.post = function (req, res) {
  Post.findById(req.params.id).populate("category").populate({
    path: "comments", populate: {
      path: "owner",
      populate: {
        path: "profile"
      }
    }
  }).populate({
    path: "owner",
    populate: {
      path: "profile"
    }
  }).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};