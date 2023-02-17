const express = require("express");

const {
  createWebsite,
  saveTemplate,
  getUserData,
  addTemplate,
} = require("../controllers/template.controller");

const router = express.Router();

router.get("/add", addTemplate);
router.post("/saveTemplate", saveTemplate);
router.post("/getUserData", getUserData);

module.exports = router;
