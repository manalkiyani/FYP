const mongoose = require("mongoose");
const validator = require("validator");
const PatientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: [1, "Age must be greater than or equal to 1"],
    max: [150, "Age must be less than or equal to 150"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
