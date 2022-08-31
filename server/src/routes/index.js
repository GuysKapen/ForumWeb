import express from 'express';

import auth from './auth';
import users from './users';
import categories from './categories';
import response from '../helpers/response';

const routes  = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', auth);
routes.use('/users', users);
routes.use('/categories', categories);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
