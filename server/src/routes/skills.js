import express from 'express';

import skills from '../controllers/skills';
import auth from '../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(skills.list)
  .post(skills.create);

routes.route('/:id')
  .get(skills.read)
  .put(skills.update)
  .delete(skills.delete);

module.exports = routes;
