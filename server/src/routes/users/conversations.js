import express from 'express';

import conversations from '../../controllers/conversations';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(conversations.list)
  .post(conversations.create);

routes.route('/:id')
  .get(conversations.read)
  .put(conversations.update)
  .delete(conversations.delete);

module.exports = routes;
