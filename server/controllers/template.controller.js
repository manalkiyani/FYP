/*jshint esversion: 6 */
const Template = require("../models/Template");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

//add a template to user's saved Templates
exports.saveTemplate = (req, res) => {
  console.log("inside savedTEmplate");
  const username = req.body.username;

  Admin.findOne({ username: username }).then((user) => {
    let userPlan = user.activePlan;

    let totalTemps = user.savedTemplates.length;
    let allowedTemps = 0;
    switch (userPlan) {
      case "Basic":
        console.log("basic plan");
        allowedTemps = 1;
        break;
      case "starter":
        allowedTemps = 2;
        break;
      case "professional":
        allowedTemps = 5;
        break;
      case "organization":
        allowedTemps = 10;
        break;
      default:
        allowedTemps = 0;
    }

    if (totalTemps >= allowedTemps) {
      console.log(user);
      return res.status(500).json({ message: "Limit Reached" });
    } else {
      let date_ob = new Date();
      // current date
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();

      const template = new Template({
        _id: mongoose.Types.ObjectId(),
        createdAt: date + "-" + month + "-" + year,
        name: req.body.template.name,
        type: req.body.template.type,
        pages: req.body.template.pages,
        data: req.body.template.data,
      });

      return template
        .save()
        .then((newTemp) => {
          user.savedTemplates.push(newTemp._id);
          user
            .save()
            .then((updatedUser) => {
              return res.status(201).json({
                status: 201,
                success: true,
                message: "success",
                Template: newTemp,
                User: updatedUser,
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
  });
};

exports.getTemplates = (req, res) => {
  const username = req.body.username;
  try {
    Admin.findOne({ username: username })
      .select("savedTemplates")
      .populate("savedTemplates")
      .then((data) => {
        console.log("data At backend", data);
        return res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error" });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getTemplate = (req, res) => {
  const templateId = req.params.templateId;
  console.log("templateId", templateId);
  Template.findById(templateId)
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
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
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.updateTemplate = async (req, res) => {
  console.log("inside updateTemplate");
  try {
    // extract relevant data from request body
    const { id, type, pages, data } = req.body.template;

    // find the template by id
    const template = await Template.findById(id);
    console.log("template", template);
    // if template not found, return 404 error
    if (!template) {
      console.log("Template not found");
      return res.status(404).json({ error: "Template not found" });
    }

    // update template with new data and save changes
    template.type = type;
    template.pages = pages;
    template.data = data;
    await template.save();

    // return updated template as response
    res.status(201).json({ template });
  } catch (error) {
    // handle errors and return appropriate response
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

//delete template from admin list and then from template schema, get user id and template id

exports.deleteTemplate = async (req, res) => {
  try {
    const { adminId, templateId } = req.params;

    // Remove the template ID from the savedTemplates field in the admin document
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { $pull: { savedTemplates: templateId } },
      { new: true }
    );

    // If the template was saved by no admins, delete the template document itself
    await Template.findByIdAndDelete(templateId);

    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
