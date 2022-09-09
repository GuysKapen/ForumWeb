import express from 'express';

import fields from '../controllers/fields';
import auth from '../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(fields.list)
  .post(fields.create);

routes.route('/:id')
  .get(fields.read)
  .put(fields.update)
  .delete(fields.delete);

module.exports = routes;
