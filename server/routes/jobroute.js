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

const {addApplication} = require("../controllers/applications.controller");

router.post("/", addJob);
router.get("/", getJobs);
router.post("/get", getListOfJobs);
router.get("/:jobId", getJob);
// router.post("/check", checkJobExists);
router.patch("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.post("/apply", addApplication);

module.exports = router;
