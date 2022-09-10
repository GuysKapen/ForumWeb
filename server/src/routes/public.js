import express from 'express';

import publicC from '../controllers/public';

const routes = express.Router({ mergeParams: true });

routes.route('/categories')
  .get(publicC.categories)

routes.route('/posts')
  .get(publicC.posts)

routes.route('/companies')
  .get(publicC.companies)
routes.route('/skills')
  .get(publicC.skills)
routes.route('/fields')
  .get(publicC.fields)


routes.route('/posts/:id')
  .get(publicC.post)

module.exports = routes;
