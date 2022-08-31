import express from 'express';

import categories from '../controllers/categories';
import auth from '../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(categories.list)
  .post(categories.create);

routes.route('/:id')
  .get(categories.read)
  .put(categories.update)
  .delete(categories.delete);

module.exports = routes;
