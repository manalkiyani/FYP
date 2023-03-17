const mongoose = require("mongoose");

const cart = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productId: { type: String, required: true },
  },
  {
    collection: "Cart",
  }
);
mongoose.model("Cart", cart);
