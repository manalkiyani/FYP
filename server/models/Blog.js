const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blog = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  tagline: { type: String },
  tags: { type: String },
  readingTime: { type: String,},
  writer: { type: String,  },
  publishedDate: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  template: { type: 'boolean', default: false },
  rating: {
    stars: { type: String },
    count: { type: Number },
  },
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
    },
  ],
  bookmarks: { type: Number },
  shares: { type: Number },
});
module.exports = mongoose.model("blog", blog);
