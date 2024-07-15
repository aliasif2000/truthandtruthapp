const express = require("express");
const router = express.Router();
const {
  addTruthController,
  deleteTruthController,
  getAdultsTruth,
  getAllUsers,
  getKidsTruth,
  getTeensTruth,
  getTruthController,
  updateTruthController,
} = require("../controller/admin.controller");

router.route("/gettruth").get(getTruthController);
router.route("/getadultstruth").get(getAdultsTruth);
router.route("/getkidstruth").get(getKidsTruth);
router.route("/getteenstruth").get(getTeensTruth);
router.route("/getalluser").get(getAllUsers);

router.route("/addtruth").post(addTruthController);
router.route("/deletetruth").post(deleteTruthController);

router.route("/updatetruth").patch(updateTruthController);

module.exports = router;
