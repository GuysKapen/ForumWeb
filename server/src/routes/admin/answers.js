import express from 'express';

import answers from '../../controllers/admin/answers';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route("/")
  .get(answers.list)

routes.route('/:id/approve')
  .put(answers.approve)

routes.route('/:id')
  .get(answers.read)
  .delete(answers.delete)

module.exports = routes;
