import express from 'express';

import recruitments from '../../controllers/admin/recruitments';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route("/")
  .get(recruitments.list)

routes.route('/:id/approve')
  .put(recruitments.approve)

routes.route('/:id')
  .delete(recruitments.delete)

module.exports = routes;
