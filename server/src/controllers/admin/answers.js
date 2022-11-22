import mongoose from 'mongoose';
import response from '../../helpers/response';

import _ from 'underscore';

const Answer = mongoose.model('Answer');

exports.list = function (req, res) {
    Answer.find({})
        .populate("post")
        .exec(function (err, result) {
            if (err) return response.sendNotFound(res);
            res.json(result);
        })
};

exports.approve = function (req, res) {
    const attrs = { correct: true }
    Answer.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.delete = async function (req, res) {
  Answer.deleteOne({ _id: req.params.id }, async function (err, item) {
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.read = function (req, res) {
  Answer.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};