import auth from '../controllers/auth';
const express = require("express");
const { updateController } = require("../controllers/auth");
const router = express.Router();
const {
  registerController,
  activationController,
  loginController,
  forgetController,
  resetController,
  googleLoginController,
  facebookLoginController
} = require("../controllers/auth");

const {
  validRegister,
  validUpdate,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

router.post("/register", validRegister, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, loginController);
router.put("/password/forget", forgotPasswordValidator, forgetController);
router.put("/password/reset", resetPasswordValidator, resetController);
router.post('/google/login', googleLoginController)
router.post('/facebook/login', facebookLoginController)
router.route('/authenticate')
  .post(auth.authenticate);

module.exports = router;