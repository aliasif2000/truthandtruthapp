const express = require("express");
const adminRoutes = express.Router();
const getTruthController = require("../controller/admin/fetchData/getTruthController");
const getKidsTruth = require("../controller/admin/fetchData/getKidsTruth");
const getTeensTruth = require("../controller/admin/fetchData/getTeensTruth");
const getAdultsTruth = require("../controller/admin/fetchData/getAdultsTruth");
const getAllUsers = require("../controller/admin/fetchData/getAllUsers");
const addTruthController = require("../controller/admin/changingData/addTruthController");
const deleteTruthController = require("../controller/admin/changingData/deleteTruthController");
const updateTruthController = require("../controller/admin/changingData/updateTruthController");

adminRoutes.get("/gettruth", getTruthController);
adminRoutes.get("/getkidstruth", getKidsTruth);
adminRoutes.get("/getteenstruth", getTeensTruth);
adminRoutes.get("/getadultstruth", getAdultsTruth);
adminRoutes.get("/getalluser", getAllUsers);

adminRoutes.post("/addtruth", addTruthController);
adminRoutes.post("/deletetruth", deleteTruthController);

adminRoutes.patch("/updatetruth", updateTruthController);

module.exports = adminRoutes;


