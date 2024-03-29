const Job = require("../models/Job");
const mongoose = require("mongoose");
const User = require("../models/User");

async function addJob(req, res) {
  console.log("inside addJob function");
  console.log(req.body);
  const job = new Job({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    employmentType: req.body.employmentType,
    location: req.body.location,
    deadline: req.body.deadline,
    startDate: req.body?.startDate,
    minimumQualification: req.body.minimumQualification,
    showPayBy: req.body.showPayBy,
    range: {
      min: req.body?.range.min,
      max: req.body?.range.max,
    },
    startingAmount: req.body?.startingAmount,
    maximumAmount: req.body?.maximumAmount,
    exactAmount: req.body?.exactAmount,
    description: req.body?.description,
    descriptionFile: req.body?.descriptionFile,
  });
  return job
    .save()
    .then((newJob) => {
      return res.status(201).json({
        success: true,
        message: "New job created successfully",
        jobId: newJob._id,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
async function getJob(req, res) {
  const id = req.params.jobId;
  Job.findById(id)
    .then((job) => {
      res.status(200).json({
        success: true,
        message: "A single job",
        job: job,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
async function getJobs(req, res) {
  Job.find()
    .then((jobs) => {
      res.status(200).json({
        success: true,
        message: "A list of all jobs",
        jobs: jobs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
async function getListOfJobs(req, res) {
  Job.find({ _id: { $in: req.body.jobIds } })
    .then((selectedJobs) => {
      res.status(200).json({
        success: true,
        message: "A list of jobs",
        jobs: selectedJobs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
async function deleteJob(req, res) {
  const id = req.params.jobId;
  Job.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
async function updateJob(req, res) {
  const id = req.params.jobId;
  Job.updateOne({ _id: id }, { $set: req.body })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Job updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
//check if the job with given title already exists
async function checkJobExists(req, res) {
  const title = req.body.title;
  Job.find({ title: title })
    .then((job) => {
      console.log("job", job);
      if (job) {
        return res.status(409).json({
          success: false,
          message: "Job already exists",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Job does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

module.exports = {
  addJob,
  getJob,
  getJobs,
  getListOfJobs,
  deleteJob,
  updateJob,
  checkJobExists,
};
