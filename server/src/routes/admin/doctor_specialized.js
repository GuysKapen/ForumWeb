import express from 'express';

import docSpecialized from '../../controllers/admin/doctor_specialized';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(docSpecialized.list)
  .post(docSpecialized.create);

routes.route('/:id')
  .get(docSpecialized.read)
  .put(docSpecialized.update)
  .delete(docSpecialized.delete);

module.exports = routes;
