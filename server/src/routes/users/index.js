import express from 'express';

import users from '../../controllers/users';
import auth from '../../controllers/auth';
import items from './items';
import posts from './posts';
import recruitments from './recruitments';
import comments from './comments';
import uploads from './uploads';
import profiles from './profiles';
import userDetails from './user_details';
import applies from './applies';
import save from './save';
import answers from './answers';
import conversations from './conversations';
import companies from './companies';

const routes = express.Router();

routes.use('/:userId/items', users.loadUser, items);
routes.use('/:userId/posts', users.loadUser, posts);
routes.use('/:userId/recruitments', users.loadUser, recruitments);
routes.use('/:userId/comments', users.loadUser, comments);
routes.use('/:userId/uploads', users.loadUser, uploads);
routes.use('/:userId/profiles', users.loadUser, profiles);
routes.use('/:userId/details', users.loadUser, userDetails);
routes.use('/:userId/applies', users.loadUser, applies);
routes.use('/:userId/save', users.loadUser, save);
routes.use('/:userId/answers', users.loadUser, answers);
routes.use('/:userId/conversations', users.loadUser, conversations);
routes.use('/:userId/companies', users.loadUser, companies);

routes.route('/:id')
  .all(auth.verifyToken)
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  .get(auth.verifyToken, users.list)
  .post(users.create);

module.exports = routes;
