const Application = require("../models/Application");
const mongoose = require("mongoose");
const User = require("../models/User");

function addApplication(req, res) {
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
        web: req.body.web,
        message: req.body.message,
        resume: req.body.resume,
    });
    return application
        .save()
        .then((newApplication) => {
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