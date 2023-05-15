const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const template = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  img: { type: String },
  type: { type: String, enum: ["medical", "eccomerce", "blog", "business"] },
  pages: {
    type: Object,
  },
  createdAt: { type: String },

  data: { type: Object }, //may contain list of blogs,orders,appointments,applications
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }], //messagesSent by the user
  rating: { type: Number }, // rating of the template

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //users who have signed up for this admins website
});
module.exports = mongoose.model("template", template);
//  name: { type: String },
//       blocks: [{ type: String }],
