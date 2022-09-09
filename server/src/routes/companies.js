import express from 'express';

import companies from '../controllers/companies';
import auth from '../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(companies.list)
  .post(companies.create);

routes.route('/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

module.exports = routes;
