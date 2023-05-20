const TemlplatId = require("../models/TemplateId");

// Method for adding website data
exports.addWebsiteData = async (req, res) => {
  try {
    const { templateId, type } = req.body;

    // Get the singleton document
    const websiteData = await TemlplatId.getSingleton();

    // Update the document's fields
    console.log(websiteData)
    websiteData.templateId = templateId;
    websiteData.type = type;

    // Save the updated document
    const updatedWebsiteData = await websiteData.save();

    res.json(updatedWebsiteData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add website data" });
  }
};

// Method for updating website data
exports.updateWebsiteData = async (req, res) => {
  try {
    const { templateId, type } = req.body;

    // Get the singleton document
    const websiteData = await TemlplatId.getSingleton();

    // Update the document's fields
    websiteData.templateId = templateId;
    websiteData.type = type;

    // Save the updated document
    const updatedWebsiteData = await websiteData.save();

    res.json(updatedWebsiteData);
  } catch (error) {
    res.status(500).json({ error: "Failed to update website data" });
  }
};

// Method for deleting website data
exports.deleteWebsiteData = async (req, res) => {
  try {
    // Get the singleton document
    const websiteData = await TemlplatId.getSingleton();

    // Remove the document
    await websiteData.remove();

    res.json({ message: "Website data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete website data" });
  }
};
exports.getWebsiteData = async (req, res) => {
  try {
    const websiteData = await TemlplatId.getSingleton();
    res.json(websiteData);
  } catch (error) {
    res.status(500).json({ error: "Failed to get website data" });
  }
};
