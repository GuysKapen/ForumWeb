import express from 'express';

import applies from '../../controllers/recruiter/applies';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenRecruiter);

routes.route('/:id/approve')
  .put(applies.approve)

routes.route('/:id/download')
  .get(applies.download)

module.exports = routes;
