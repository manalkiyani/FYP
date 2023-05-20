const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publishedwebsites = new mongoose.Schema(
  {
    name:{ type: String },
    subdomain: { type: String, required: true },

    templateid: { type: Schema.Types.ObjectId, ref: "template" },
    type:{type: String},
    Date:{type: String}
  },
 
);
module.exports = mongoose.model("publishedwebsites", publishedwebsites);
