import express from 'express';

import answers from '../../controllers/answers';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(answers.list)
  .post(answers.create);

routes.route('/:id')
  .get(answers.read)
  .put(answers.update)
  .delete(answers.delete);

module.exports = routes;
