import mongoose from 'mongoose';
import response from '../../helpers/response';

import _ from 'underscore';

const Recruitment = mongoose.model('Recruitment');

exports.approve = function (req, res) {
    const attrs = { status: true }
    Recruitment.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};