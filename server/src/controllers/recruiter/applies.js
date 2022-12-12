import mongoose from 'mongoose';
import response from '../../helpers/response';

import _ from 'underscore';

const Apply = mongoose.model('Apply');

exports.approve = function (req, res) {
  const attrs = { status: true }
  Apply.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.download = function (req, res) {
  Apply.findById(req.params.id)
    .exec(function (err, doc) {
      if (err) return response.sendNotFound(res);
      if (!doc.cv) return
      res.download(doc.cv)
    })
};