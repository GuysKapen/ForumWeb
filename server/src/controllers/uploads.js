import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const routes = express.Router({ mergeParams: true });

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
            const parent = `./uploads/media/${req.params.userId}/images`
            const oldPath = `${parent}/${avatar.name}`
            const newPath = `${parent}/${name}`

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
            const parent = `./uploads/media/${req.params.userId}/files`
            const oldPath = `${parent}/${file.name}`
            const newPath = `${parent}/${name}`

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