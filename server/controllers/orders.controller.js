const Order = require("../models/Order");
const Template = require("../models/Template");

const orderReceived = async (req, res) => {
  let transactionid;
  const { userid, totalprice, address, paymentmethod } = req.body;
  if (paymentmethod === "Easypaisa") {
    transactionid = req.body.transactionid;
  } else {
    transactionid = "";
  }
  try {
    const order = await Order.create({
      userid,
      totalprice,
      products: req.body.products,
      address,
      paymentmethod,
      transactionid,
    });
    res.send({ message: "Order Received Sucessfully", order });
  } catch (error) {
    res.send({ message: "error" });
  }
};
const OrdersToTemplate = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const templateId = req.body.templateId;
    const template = await Template.findById(templateId);
    if (!template) {
      throw new Error("Template not found");
    }
    const updatedData = {
      ...template.data,
      orders: [...(template.data.orders || []), orderId],
    };
    await Template.findByIdAndUpdate(
      templateId,
      { data: updatedData },
      { new: true }
    );
    res.send({ message: "Template updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { orderReceived, OrdersToTemplate };
