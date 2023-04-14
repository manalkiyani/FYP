const express = require("express");
const {
  addJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  getListOfJobs,
  checkJobExists
} = require("../controllers/job.controller");
const router = express.Router();

router.post("/", addJob);
router.get("/", getJobs);
router.post("/get", getListOfJobs);
router.get("/:jobId", getJob);
router.get("/check/:jobTitle", checkJobExists);
router.patch("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
