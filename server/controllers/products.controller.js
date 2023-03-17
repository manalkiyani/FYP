const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Product = require("../models/Product");
const User = require("../models/User");

const addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  console.log(req.body);

  try {
    await Product.create({
      name,
      price,
      description,
      image,
    });
    res.send({ status: "Product added Sucessfully" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

function getProducts(req, res) {
  Product.find()
    .then((allProds) => {
      return res.status(200).json({
        success: true,
        message: "A list of all products",
        Products: allProds,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
    });
}
async function getListOfProducts(req, res) {
  console.log("Req.body", req.body.productIds);

  //find blogs which have ids in the array  
  Product.find({ id: { $in: req.body.productIds } })
    
    .then((allProds) => {
      return res.status(200).json({
        success: true,
        message: "A list of all products",
        Products: allProds,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

function delProduct(req, res) {
  const id = req.params.Id;

  Product.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        messsage: "Product successfully deleted",
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
function editproduct(req, res) {
  const id = req.params.Id;
  const productObject = req.body;
  Product.findOneAndUpdate({ _id: id }, productObject, { new: true })
    .then((product) => {
      res.status(200).json({
        success: true,
        message: "Product successfully updated",
        product: product,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      })
    );
}

const addtocart = async (req, res) => {
  const { userid, productid, name, price, description,image } = req.body;
  console.log(req.body);
  User.findOne({ _id: userid }, (err, user) => {
    if (user) {
      const product = user.cart.find((item) => item.productId === productid);
      if (product) {
        product.quantity = product.quantity + 1;

        User.updateOne(
          { _id: userid },
          { $set: { cart: user.cart } },
        (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send({ error: "Failed to update cart" });
            } else {
              console.log("Quantity updated successfully");
              res.send({ success: true });
            }
          }
        );
      } else {
        user.cart.push({
          productId: productid,
          quantity: 1,
          _id: productid,
          name: name,
          price: price,
         
          image
        });
        User.updateOne(
          { _id: userid },
          { $set: { cart: user.cart } },
          (err) => {
            if (err) throw err;
            res.send({ message: "new product added" });
          }
        );
      }
    }
    else {
      console.log("User not found");
      res.status(404).send('User not found');
    }
  });
};

const getfromcart = async (req, res) => {
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user.cart);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
const getproduct = async (req, res) => {
  ///returns all the products inside the cart of SINGLE LOGGED IN user.
  Product.findOne({ _id: req.params.productId })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const editQuantityinCart = async (req, res) => {
  User.updateOne(
    { _id: "63e8df1974cc16f2b7ecacb6" },
    { $set: { cart: req.body.cart } },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Failed to update cart" });
      } else {
        console.log("Quantity updated successfully");
        res.send({ success: true, message: "quantity successfully updateddd" });
      }
    }
  );
};

const stripePayment = async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getListOfProducts,
  delProduct,
  editproduct,
  addtocart,
  getfromcart,
  getproduct,
  editQuantityinCart,
  stripePayment,
};
