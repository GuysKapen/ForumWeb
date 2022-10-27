import mongoose from 'mongoose';
import response from '../../helpers/response';

import _ from 'underscore';

const User = mongoose.model('User');

exports.list = function (req, res) {
    const attrs = { status: true }
    User.find({}, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.activate = function (req, res) {
    const attrs = { status: true }
    User.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.disable = function (req, res) {
    const attrs = { status: false }
    User.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.delete = async function (req, res) {
    User.findOne({ _id: req.params.id }, async function (err, user) {
        if (err) return res.send(err);
        if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
        await User.deleteOne(user).exec()
        res.json({ message: 'User successfully deleted' });
    });
};