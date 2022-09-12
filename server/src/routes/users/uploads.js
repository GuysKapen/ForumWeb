import express from 'express';

import uploads from '../../controllers/uploads';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/image')
  .post(uploads.uploadImage);

routes.route('/file')
  .post(uploads.uploadFile);

module.exports = routes;
