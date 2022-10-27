import express from 'express';

import users from '../../controllers/admin/users';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(users.list)

module.exports = routes;
