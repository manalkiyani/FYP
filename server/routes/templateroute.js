const express = require("express");

const {
 
  saveTemplate,
  getTemplates,
  getTemplate,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/template.controller");

const router = express.Router();
router.delete("/:adminId/:templateId",deleteTemplate);
router.get("/add", addTemplate);
router.get('/getTemplate/:templateId', getTemplate)
router.post("/saveTemplate", saveTemplate);
router.post("/getTemplates", getTemplates);
router.post("/updateTemplate", updateTemplate);

module.exports = router;
