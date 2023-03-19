
const Order = require('../models/Order')
const Template = require("../models/Template")

const orderReceived = async (req, res)=>{
    let transactionid;
    const {userid, totalprice, address, paymentmethod} = req.body;
    if (paymentmethod==='Easypaisa'){
        transactionid = req.body.transactionid;
      }
    else{
        transactionid = '';
    }
    try {     
          
      await Order.create({
        userid,
        totalprice,
        products:req.body.products,
        address,
        paymentmethod,
        transactionid
      });
      res.send({ message: "Order Received Sucessfully" });
    } catch (error) {
      res.send({ message: "error" });
    }
  };
  const OrdersToTemplate = async(req,res)=>{
    let orderIds=[]
    //retrieving all the orders from  Orders collection and storing in array
    Order.find({}, '_id', (err, orders) => {
      if (err) {
        console.error(err);
      } else {
        // Map the _id fields to an array of order IDs
        orderIds = orders.map((order) => order._id.toString());
    
        console.log(orderIds); // ['orderid1', 'orderid2', 'orderid3'] (example output)
      }
    });

    try {
    
       // Get the ID from the request body in which you want to store these orderids
      const template = await Template.findById('6416cfa6e7576796af285c3d'); // Find the document with the specified ID
      if (!template) {
        return res.send({ message: 'Template not found' });
      } 
        consle.log(template)
      // Update the data field with the orderids array
      template.data = { orders: orderIds }; 
      await template.save(); // Save the changes to the document
      res.send({ message: 'Template updated successfully' });
    } catch (error) {
      console.error(error);
      res.send({ message: 'Internal server error' });
    }
    
  }
  module.exports = {orderReceived,OrdersToTemplate};
