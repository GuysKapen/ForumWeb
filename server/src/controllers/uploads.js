import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
const sep = require('path').sep

exports.uploadImage = function (req, res) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.image;
            var fileExt = avatar.name.split('.').pop();
            const name = `${uuidv4()}.${fileExt}`;
            const parent = `.${sep}uploads${sep}media${sep}${req.params.userId}${sep}images`
            const oldPath = `${parent}${sep}${avatar.name}`
            const newPath = `${parent}${sep}${name}`

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv(oldPath, function () {
                // Rename
                fs.renameSync(oldPath, newPath)

                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: newPath,
                        mimetype: avatar.mimetype,
                        size: avatar.size
                    }
                });
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.uploadFile = function (req, res) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let file = req.files.file;
            var fileExt = file.name.split('.').pop();
            const name = `${uuidv4()}.${fileExt}`;
            const parent = `.${sep}uploads${sep}media${sep}${req.params.userId}${sep}files`
            const oldPath = `${parent}${sep}${file.name}`
            const newPath = `${parent}${sep}${name}`

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv(oldPath, function () {
                // Rename
                fs.renameSync(oldPath, newPath)

                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: newPath,
                        mimetype: file.mimetype,
                        size: file.size
                    }
                });
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}