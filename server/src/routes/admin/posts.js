import express from 'express';

import posts from '../../controllers/admin/posts';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route("/")
  .get(posts.list)

routes.route('/:id/approve')
  .put(posts.approve)

routes.route('/:id')
  .get(posts.read)
  .delete(posts.delete)

module.exports = routes;
