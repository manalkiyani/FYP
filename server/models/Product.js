const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    rating: [{type: Number }],
    review: [{type: String}],
    avgRating: {type: Number}
  },
 
);
module.exports = mongoose.model("Products", product);
