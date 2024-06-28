const express = require("express");
const truthRoutes = express.Router();
const validateToken = require("../middleware/validateToken");
const addTruthController = require("../controller/truth/addTruthController");
const categoryController = require("../controller/truth/categoryController");

truthRoutes.post("/addtruth", validateToken, addTruthController);
truthRoutes.post("/categorytruth", validateToken, categoryController);

module.exports = truthRoutes;
