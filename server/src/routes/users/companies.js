import express from 'express';

import companies from '../../controllers/companies';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/request')
  .post(companies.request);

module.exports = routes;
