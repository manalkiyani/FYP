const mongoose = require("mongoose");

const websiteData = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  templateId: { type: String },
  viewerId: { type: String },
});
module.exports = mongoose.model("websiteData", websiteData);
