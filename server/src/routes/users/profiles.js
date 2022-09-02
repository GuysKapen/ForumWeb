import express from 'express';

import profiles from '../../controllers/profiles';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(profiles.list)
  .post(profiles.create);

routes.route('/:id')
  .get(profiles.read)
  .put(profiles.update)
  .delete(profiles.delete);

module.exports = routes;
