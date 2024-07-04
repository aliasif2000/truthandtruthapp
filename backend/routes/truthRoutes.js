const express = require("express");
const truthRoutes = express.Router();
const addTruthController = require("../controller/truth/addTruthController");
const categoryController = require("../controller/truth/categoryController");
const validateJWTToken = require("../middleware/validateJWTToken");

truthRoutes.post("/addtruth", validateJWTToken, addTruthController);
truthRoutes.post("/categorytruth", validateJWTToken, categoryController);

module.exports = truthRoutes;
