const express = require("express");
const router = express.Router();
const TemlplatId = require("../controllers/TemplateId.controller");

// Route for getting website data
router.get("/", TemlplatId.getWebsiteData);

// Route for adding website data
router.post("/", TemlplatId.addWebsiteData);

// Route for updating website data
router.put("/:id", TemlplatId.updateWebsiteData);

// Route for deleting website data
router.delete("/:id", TemlplatId.deleteWebsiteData);

module.exports = router;
