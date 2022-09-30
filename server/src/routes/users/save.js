import express from 'express';

import save from '../../controllers/save';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(save.list)
  .post(save.create);

routes.route('/:id')
  .get(save.read)
  .put(save.update)
  .delete(save.delete);

module.exports = routes;
