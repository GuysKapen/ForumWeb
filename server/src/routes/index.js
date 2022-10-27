import express from 'express';

import auth from './auth';
import users from './users';
import categories from './categories';
import companies from './companies';
import skills from './skills';
import fields from './fields';
import posts from './posts';
import recruitments from './admin/recruitments';
import answers from './admin/answers';
import adminUsers from './admin/users';
import publicRoute from './public';
import response from '../helpers/response';

const routes  = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', auth);
routes.use('/', publicRoute);
routes.use('/users', users);
routes.use('/categories', categories);
routes.use('/companies', companies);
routes.use('/skills', skills);
routes.use('/fields', fields);
routes.use('/posts', posts);
routes.use('/recruitments', recruitments);
routes.use('/answers', answers);
routes.use('/admin/users', adminUsers);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
