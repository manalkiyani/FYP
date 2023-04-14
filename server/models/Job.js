const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const job = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  title: { type: String, required: true },
  employmentType: {
    type: String,
    default: "Full-time",
    enum: ["Full-time", "Part-time", "Temporary", "Intern", "Contract"],
  },
  location: {
    type: String,
    default: "InOffice",
    enum: ["InOffice", "Remote", "Both"],
  },
  deadline: { type: String },
  startDate: { type: String },

  minimumQualification: {
    type: String,
    default: "Bachelors",
    enum: ["Associate", "Masters", "Bachelors", "Ph.D", "Pursuing Degree"],
  },
  showPayBy: {
    type: String,
    default: "Range",
    enum: ["Exact amount", "Starting amount", "Range", "Maximum amount"],
  },
  range: {
    min: { type: Number },
    max: { type: Number },
  },
  startingAmount: { type: Number },
  maximumAmount: { type: Number },
  exactAmount: { type: Number },
  description: { type: String },

  descriptionFile: { type: String },

  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
});

module.exports = mongoose.model("job", job);
