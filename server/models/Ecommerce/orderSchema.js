const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userid: String,
    totalprice: Number,
    products: Array,
    address: String,
    paymentmethod: String,
    transactionid: String,
}, {
    collection: "Order"
}); 
module.exports=mongoose.model("Order", orderSchema);
