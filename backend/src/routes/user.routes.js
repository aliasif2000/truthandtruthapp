const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUserData");
const {
  loginUser,
  registerUser,
  forgetPassword,
  otpSend,
  resetPassword,
} = require("../controller/user.controller");

router.route("/login").post(validateUser("login"), loginUser);
router.route("/register").post(validateUser("register"), registerUser);
router.route("/forgetpassword").post(forgetPassword);
router.route("/otpcheck").post(otpSend);
router.route("/resetpassword").post(resetPassword);

module.exports = router;
