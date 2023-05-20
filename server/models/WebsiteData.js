const mongoose = require('mongoose');

const websiteDataSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    templateId: { type: String },
    type: { type: String },
  },
  { strict: 'throw' } // Enforce strict mode to prevent additional fields
);

websiteDataSchema.statics.getSingleton = async function () {
  // Find the existing document
  const document = await this.findOne();

  if (document) {
    return document;
  }

  // If no document exists, create a new one
  const newDocument = new this();
  await newDocument.save();

  return newDocument;
};

const WebsiteData = mongoose.model('WebsiteData', websiteDataSchema);

module.exports = WebsiteData;
