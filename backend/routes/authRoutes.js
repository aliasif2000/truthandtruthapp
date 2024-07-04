const express = require("express");
const authRoutes = express.Router();
const loginController = require("../controller/auth/loginController");
const registerController = require("../controller/auth/registerController");
const validateUser = require("../middleware/validateUserData");
const forget_password = require("../controller/auth/forget_password");
const otpController = require("../controller/auth/otpController");
const resetController = require("../controller/auth/resetController");
const fetchAllUserController = require("../controller/fetchAllUserController");
const validateJWTToken = require("../middleware/validateJWTToken");
const validateRandomToken = require("../middleware/validateRandomToken");

authRoutes.get("/getalluser", validateJWTToken, fetchAllUserController);
authRoutes.post("/login", validateUser("login"), loginController);
authRoutes.post("/register", validateUser("register"), registerController);
authRoutes.post("/forgetpassword", forget_password);
authRoutes.post("/otpcheck", validateRandomToken, otpController);
authRoutes.post("/resetpassword", validateRandomToken, resetController);

module.exports = authRoutes;
