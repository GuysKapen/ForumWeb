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
  Post.find({}).populate("category").exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};
