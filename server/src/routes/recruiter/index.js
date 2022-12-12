
import express from 'express';

import applies from './applies';
import auth from '../../controllers/auth';

const routes = express.Router();

routes.use(auth.verifyTokenRecruiter);

routes.use('/applies', applies);

module.exports = routes;
