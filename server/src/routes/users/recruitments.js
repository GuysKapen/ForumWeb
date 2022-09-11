import express from 'express';

import recruitments from '../../controllers/recruitments';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(recruitments.list)
  .post(recruitments.create);

routes.route('/:id')
  .get(recruitments.read)
  .put(recruitments.update)
  .delete(recruitments.delete);

module.exports = routes;
