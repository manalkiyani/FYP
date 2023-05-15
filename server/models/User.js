const mongoose = require("mongoose");
const validator = require("validator");
const User = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  cart: Array,
  bookmarks: Array, //array of blog ids
  email: {
    type: String,
    required: true,

    validate: [validator.isEmail, "Please provide a valid email"],
  },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,

    min: [1, "Age must be greater than or equal to 1"],
    max: [150, "Age must be less than or equal to 150"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", User);
