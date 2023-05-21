const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blog = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: { type: String ,default: 'Other'},
  title: { type: String, required: true },
  tagline: { type: String },
  tags: { type: Array },
  readingTime: { type: String,},
  writer: { type: String,  },
  publishedDate: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  videos:[{type:String}],
  description: { type: String, required: true },
  image: { type: String },
  template: { type: 'boolean', default: false },
  rating: {
    stars: { type: String },
    count: { type: Number },
  },
  reviews: [
    {
     name: { type: String },
      email: { type: String },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  bookmarks: { type: Number },
  shares: { type: Number },
});
module.exports = mongoose.model("blog", blog);
