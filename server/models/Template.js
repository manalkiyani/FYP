const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const template = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, enum: ["medical", "eccomerce", "blog", "business"] },
  pages: {
    type: Object,
  },

  data: { type: Object }, //may contain list of blogs,orders,appointments,applications
  message: [{ type: Object }], //messagesSent by the user
  rating: { type: Number }, // rating of the template
  users: [{ type: Object }], //users who have signed up for this admins website
});
module.exports = mongoose.model("template", template);
//  name: { type: String },
//       blocks: [{ type: String }],
