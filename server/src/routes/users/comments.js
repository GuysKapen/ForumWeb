import express from 'express';

import comments from '../../controllers/comments';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(comments.list)
  .post(comments.create);

routes.route('/:id')
  .get(comments.read)
  .put(comments.update)
  .delete(comments.delete);

routes.route('/:id/related')
  .get(comments.related)

module.exports = routes;
