import express from 'express';

import posts from '../../controllers/posts';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(posts.list)
  .post(posts.create);

routes.route('/:id')
  .get(posts.read)
  .put(posts.update)
  .delete(posts.delete);

routes.route('/:id/related')
  .get(posts.related)

module.exports = routes;
