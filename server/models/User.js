const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    cart: Array,
    bookmarks: Array, //array of blog ids
  },
 
);
module.exports = mongoose.model("User", User);
