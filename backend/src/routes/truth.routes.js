const express = require("express");
const router = express.Router();
const validateJWTToken = require("../middleware/validateJWTToken");
const { addTruth, getCategory } = require("../controller/truth.controller");

router.route("/addtruth").post(validateJWTToken, addTruth);
router.route("/categorytruth").post(validateJWTToken, getCategory);

module.exports = router;
