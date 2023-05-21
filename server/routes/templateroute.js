const express = require("express");

const {
  saveTemplate,
  getTemplates,
  getTemplate,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  login,
  register,
  getListOfTemplates,
  getPublishedWebsites,
  getSubdomain,
} = require("../controllers/template.controller");

const router = express.Router();
router.delete("/:adminId/:templateId", deleteTemplate);
router.get("/add", addTemplate);
router.post("/getList", getListOfTemplates);
router.get("/getTemplate/:templateId", getTemplate);
router.post("/saveTemplate", saveTemplate);
router.post("/getTemplates", getTemplates);
router.post("/getsubdomain", getSubdomain);
router.post("/updateTemplate", updateTemplate);
router.post("/getpublishedwebsites", getPublishedWebsites);


//user managemenet
router.post("/signup", register);
router.post("/login", login);

module.exports = router;
