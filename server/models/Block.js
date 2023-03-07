const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const block = new Schema({
  id: { type: String },
  key: { type: String },
  img: { type: String },
  type: { type: String },
  Component: { type: String },
  Data: { type: Object },
});
module.exports = mongoose.model("block", block);
