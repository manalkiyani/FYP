const Application = require("../models/Application");
const mongoose = require("mongoose");
const User = require("../models/User");
const Job = require("../models/Job");

async function addApplication(req, res) {
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
  return application
    .save()
    .then((newApplication) => {
      //add this application to the job
      Job.findByIdAndUpdate(req.body.jobId, {
        $push: { applications: newApplication._id },
      });

      return res.status(201).json({
        success: true,
        message: "New application created successfully",
        applicationId: newApplication._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

async function getApplications(req, res) {
    await Job.findById(req.params.jobId).populate("applications").exec((err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!job) {
            return res

                .status(404)

                .json({ success: false, error: `Job not found` })
        }
        return res.status(200).json({ success: true, data: job.applications })
    }).catch(err => console.log(err))
}




module.exports = {
  addApplication,
    getApplications,
};
