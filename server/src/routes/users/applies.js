import express from 'express';

import applies from '../../controllers/applies';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(applies.list)
  .post(applies.create);

routes.route('/:id')
  .get(applies.read)
  .put(applies.update)
  .delete(applies.delete);

module.exports = routes;
