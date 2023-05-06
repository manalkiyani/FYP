const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    images: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    date: { type: Date, default: Date.now },
    rating: [{type: Number }],
    review: [{type: String}],
    avgRating: {type: Number}
  },
 
);
module.exports = mongoose.model("Products", product);
