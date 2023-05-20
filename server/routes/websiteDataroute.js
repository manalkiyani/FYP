const express = require('express');
const router = express.Router();
const websiteDataController = require('../controllers/websiteData.controller');

// Route for adding website data
router.post('/', websiteDataController.addWebsiteData);

// Route for deleting website data
router.delete('/:id', websiteDataController.deleteWebsiteData);

// Route for getting website data by ID
router.get('/:id', websiteDataController.getWebsiteDataById);

module.exports = router;
