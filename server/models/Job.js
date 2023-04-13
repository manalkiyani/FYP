const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const job = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  title: { type: String, required: true },
  employmentType: {
    type: String,
    default: "fullTime",
    enum: ["fullTime", "partTime", "temporary", "intern", "contract"],
  },
  location: {
    type: String,
    default: "inOffice",
    enum: ["inOffice", "remote", "both"],
  },
  deadline: { type: String },
  startDate: { type: String },

  minimumQualification: {
    type: String,
    default: "bachelors",
    enum: ["associate", "masters", "bachelors", "phd", "pursuingDegree"],
  },
  showPayBy: {
    type: String,
    default: "range",
    enum: ["exactAmount", "startingAmount", "range", "maximumAmount"],
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

  applications:[
    {type:mongoose.Schema.Types.ObjectId,ref:'application'}
  ]



});


module.exports = mongoose.model("job", job);
