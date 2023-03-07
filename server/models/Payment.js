const mongoose = require("mongoose");

const payment = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
   
    paymentDate:{type:String} ,
    amount: { type: String, required: true },
     activePlan: { type: String, default: "Basic" },
   
    paymentMethod: { type: String, default: "Card" }, //card - easypaisa - jazzcash
    transID : {type:String},
   
  }
 
);
module.exports = mongoose.model("payment", payment);
