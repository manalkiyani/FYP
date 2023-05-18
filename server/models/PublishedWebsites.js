const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publishedwebsites = new mongoose.Schema(
  {
    subdomain: { type: String, required: true },
    templateid: { type: Schema.Types.ObjectId, ref: "template" },
    adminid: { type: Schema.Types.ObjectId, ref: "admin" },
  },
 
);
module.exports = mongoose.model("publishedwebsites", publishedwebsites);
