import express from 'express';

import posts from '../../controllers/admin/recruitments';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/:id/approve')
  .put(posts.approve)

module.exports = routes;
