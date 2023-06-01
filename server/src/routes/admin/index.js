
import express from 'express';

import answers from './answers';
import posts from './posts';
import recruitments from './recruitments';
import users from './users';
import docSpecialized from './doctor_specialized';
import auth from '../../controllers/auth';

const routes = express.Router();

routes.use(auth.verifyTokenAdmin);

routes.use('/answers', answers);
routes.use('/posts', posts);
routes.use('/recruitments', recruitments);
routes.use('/users', users);
routes.use('/doc-specialized', docSpecialized);

module.exports = routes;
