import express from 'express';

import userDetails from '../../controllers/user_details';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(userDetails.list)
  .post(userDetails.create);

routes.route('/:id')
  .get(userDetails.read)
  .put(userDetails.update)
  .delete(userDetails.delete);

module.exports = routes;
