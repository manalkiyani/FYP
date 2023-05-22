const express = require("express");
const {
  addJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  getListOfJobs,
  checkJobExists,
} = require("../controllers/job.controller");
const router = express.Router();

const {addApplication, getListOfApplications,updateApplication} = require("../controllers/applications.controller");

router.post("/", addJob);
router.get("/", getJobs);
router.post("/get", getListOfJobs);
router.get("/:jobId", getJob);
// router.post("/check", checkJobExists);
router.post("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.post("application/apply", addApplication);
router.post("/list",getListOfApplications)

router.post("/application/:applicationId", updateApplication);

module.exports = router;
