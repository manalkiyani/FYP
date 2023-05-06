const mongoose = require("mongoose");

const category = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String },

  image: { type: String },
});
module.exports = mongoose.model("Category", category);
