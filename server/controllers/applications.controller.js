const Application = require("../models/Application");
const mongoose = require("mongoose");
const User = require("../models/User");
const Job = require("../models/Job");

async function addApplication(req, res) {
  console.log("in backend")
    try {
  const application = new Application({
 _id: mongoose.Types.ObjectId(),
    status: req.body.status,
    recruiterRemarks: req.body.recruiterRemarks,

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,

    experience: req.body.experience,
    education: req.body.education,

    facebook: req.body?.facebook,
    linkedIn: req.body?.linkedIn,
    twitter: req.body?.twitter,
    website: req.body?.website,

    message: req.body.message,
    resume: req.body.resume,
  });


    const newApplication = await application.save();
    console.log(newApplication)

    // add this application to the job
    await Job.findByIdAndUpdate(
      { _id: req.body.jobId },
      { $push: { applications: newApplication._id } }
    );

    return res.status(201).json({
      success: true,
      message: "New application created successfully",
      applicationId: newApplication._id,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

async function getApplications(req, res) {
  await Job.findById(req.params.jobId)
    .populate("applications")
    .exec((err, job) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!job) {
        return res

          .status(404)

          .json({ success: false, error: `Job not found` });
      }
      return res.status(200).json({ success: true, data: job.applications });
    })
    .catch((err) => console.log(err));
}

async function getListOfApplications(req, res) {
  try {
    Job.find({ _id: { $in: req.body.jobIds } })
      .populate("applications")
      .exec((err, jobs) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!jobs) {
          return res

            .status(404)

            .json({ success: false, error: `Jobs not found` });
        }

        return res.status(200).json({ success: true, jobs: jobs });
      });
  } catch (error) {
    console.log("error", error);
  }
}

async function updateApplication(req, res) {
  const { applicationId } = req.params;
  const { status, recruiterRemarks } = req.body;

  const application = await Application.findById(applicationId);
  if (!application) {
    return res
      .status(404)
      .json({ success: false, message: "Application not found" });
  }

  application.status = status;
  application.recruiterRemarks = recruiterRemarks;

  const updatedApplication = await application.save();

  res.status(200).json({
    success: true,
    updatedApplication,
  });
}

module.exports = {
  addApplication,
  getApplications,
  getListOfApplications,
  updateApplication,
};
