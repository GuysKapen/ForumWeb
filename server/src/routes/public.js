import express from "express";

import publicC from "../controllers/public";

const routes = express.Router({ mergeParams: true });

routes.route("/categories").get(publicC.categories);

routes.route("/posts").get(publicC.posts);

routes.route("/companies").get(publicC.companies);
routes.route("/skills").get(publicC.skills);
routes.route("/fields").get(publicC.fields);
routes.route("/recruitments").get(publicC.recruitments);

routes.route("/detail-companies").get(publicC.detailCompanies);
routes.route("/detail-skills").get(publicC.detailSkills);
routes.route("/detail-fields").get(publicC.detailFields);
routes.route("/detail-categories").get(publicC.detailCategories);

routes.route("/posts/:id").get(publicC.post);

routes.route("/recruitments/:id").get(publicC.recruitment);

routes.route("/top-recruitments").get(publicC.topRecruitments);

module.exports = routes;
