const express = require("express");

const router = express.Router();

const {
  addApplication,
  getListOfApplications,
  updateApplication,
} = require("../controllers/applications.controller");


router.post("/apply", addApplication);
router.post("/list", getListOfApplications);

router.post("/:applicationId", updateApplication);

module.exports = router;
