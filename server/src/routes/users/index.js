import express from 'express';

import users from '../../controllers/users';
import auth from '../../controllers/auth';
import items from './items';
import posts from './posts';
import recruitments from './recruitments';
import comments from './comments';
import uploads from './uploads';
import profiles from './profiles';

const routes = express.Router();

routes.use('/:userId/items', users.loadUser, items);
routes.use('/:userId/posts', users.loadUser, posts);
routes.use('/:userId/recruitments', users.loadUser, recruitments);
routes.use('/:userId/comments', users.loadUser, comments);
routes.use('/:userId/uploads', users.loadUser, uploads);
routes.use('/:userId/profiles', users.loadUser, profiles);

routes.route('/:id')
  .all(auth.verifyToken)
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  .get(auth.verifyToken, users.list)
  .post(users.create);

module.exports = routes;
