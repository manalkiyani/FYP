const WebsiteData = require('../models/WebsiteData');
const mongoose = require('mongoose');

// Method for adding website data
exports.addWebsiteData = async (req, res) => {
  try {
    const { templateId, viewerId } = req.body;

    // Create a new websiteData using the WebsiteData model
    const newWebsiteData = new WebsiteData({
      _id: new mongoose.Types.ObjectId(),
      templateId,
      viewerId,
    });

    // Save the websiteData to the database
    const savedWebsiteData = await newWebsiteData.save();

    res.status(201).json(savedWebsiteData);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add website data' });
  }
};

// Method for deleting website data

exports.deleteWebsiteData = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the websiteData by templateId and remove it
    await WebsiteData.findOneAndRemove({ templateId:id });

    res.json({ message: 'Website data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete website data' });
  }
};

// Method for getting website data by ID
exports.getWebsiteDataById = async (req, res) => {
  try {
    const { id } = req.params;


    // Find the websiteData by TemplateId
    const websiteData = await WebsiteData.findOne({ templateId: id });

    if (!websiteData) {
      return res.status(200).json({ status: '404', error: 'Website data not found' });
    }

    res.status(200).json({ status: '200', websiteData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get website data' });
  }
};
