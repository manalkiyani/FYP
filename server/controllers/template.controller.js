/*jshint esversion: 6 */
const Template = require("../models/Template");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

exports.createWebsite = (req, res, next) => {
  const username = req.body.username;
  const templateType = req.body.templateType;
  let templateData;
  Admin.findOne({ username: username }).then((user) => {
    let userPlan = user.activePlan;
    let totalTemps = user.savedTemplates.length;
    let allowedTemps = 0;
    if (userPlan === "Basic") {
      allowedTemps = 3;
    } else if (userPlan === "Pro") {
      allowedTemps = 8;
    } else if (userPlan === "Enterprise") {
      allowedTemps = 20;
    }
    if (totalTemps >= allowedTemps) {
      return res.status(500).json({ message: "Limit Reached" });
    } else {
      if (templateType === "blog") {
        templateData = {
          type: "blog",
          pages: [
            {
              name: "HomePage",
              blocks: ["63e5411b40f8b82b5f532ac8", "63e543ca9073a307d645ef71"],
            },
          ],
        };
      }
    }
  });
};
//add a template to user's saved Templates
exports.saveTemplate = (req, res, next) => {
  const username = req.body.username;

  Admin.findOne({ username: username }).then((user) => {
    let userPlan = user.activePlan;
    let totalTemps = user.savedTemplates.length;
    let allowedTemps = 0;
    if (userPlan === "Basic") {
      allowedTemps = 3;
    } else if (userPlan === "Pro") {
      allowedTemps = 8;
    } else if (userPlan === "Enterprise") {
      allowedTemps = 20;
    }
    if (totalTemps >= allowedTemps) {
      return res.status(500).json({ message: "Limit Reached" });
    } else {
      const template = new Template({
        _id: mongoose.Types.ObjectId(),
        type: req.body.type,
        pages: req.body.pages,
        data: req.body.data,
      });

      return template
        .save()
        .then((newTemp) => {
          user.savedTemplates.push(newTemp._id);
          user
            .save()
            .then((updatedUser) => {
              return res.status(201).json({
                success: true,
                message: "New template created successfully",
                Template: newTemp,
                User: updatedUser,
              });
            })
            .catch((error) => {
              res
                .status(500)
                .json({
                  success: false,
                  message: "Server error. Please try again.",
                  error: error.message,
                });
            });
        })
        .catch((error) => {
          res
            .status(500)
            .json({
              success: false,
              message: "Server error. Please try again.",
              error: error.message,
            });
        });
    }
  });
};

exports.getUserData = (req, res, next) => {
  const username = req.username;
  Admin.findOne({ username: username })
    .then((data) => {
      return res.status(200).json({ user: data });
    })
    .catch((err) => {
      return res.status(500).json({ message: "error" });
    });
};
exports.addTemplate = (req, res, next) => {
  let template = new Template({
    _id: mongoose.Types.ObjectId(),
    type: "blog",
    pages: [
      {
        name: "HomePage",
        blocks: ["63e5411b40f8b82b5f532ac8", "63e543ca9073a307d645ef71"], //list of block ids
      },
    ],
    data: {
      blogs: [
        "6390c07df72942f96f9b06a5",
        "63911d90f1977ff3de08fd9a",
        "639308cdca314ebf25bc8528",
        "63930ec3ca314ebf25bc8548",
      ], //list of blog ids
    },
  });

  return template
    .save()
    .then((newTemp) => {
      return res.status(201).json({
        success: true,
        message: "New template created successfully",
        Template: newTemp,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
    });
};
