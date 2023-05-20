const mongoose = require('mongoose');

const templateIdSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    templateId: { type: String },
    type: { type: String },
  },
  { strict: 'throw' } // Enforce strict mode to prevent additional fields
);

templateIdSchema.statics.getSingleton = async function () {
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

const TemplateId = mongoose.model('TemplateId', templateIdSchema);

module.exports = TemplateId;
