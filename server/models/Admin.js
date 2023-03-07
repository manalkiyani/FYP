const mongoose = require("mongoose");

const admin = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:"message"}], //msgs recived from users
    transactionID:{type:mongoose.Schema.Types.ObjectId,ref:"payment"}, //transaction done to buy our webiste plans
    activePlan: { type: String, default: "Basic" },
    accountStatus: { type: String, default: "Active" },
    savedTemplates: [{ type: mongoose.Schema.Types.ObjectId, ref: "template" }],
    templateCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("admin", admin);


// things to display in invoices table
// username
// cost
// date
// amount 
// plan
