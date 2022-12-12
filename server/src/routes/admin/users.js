import express from 'express';

import users from '../../controllers/admin/users';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(users.list)

routes.route('/:id/disable')
  .put(users.disable)

routes.route('/:id/activate')
  .put(users.activate)

routes.route('/:id')
  .delete(users.delete)

module.exports = routes;
