const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

const addProduct = async (req, res) => {
  const { name, price, description, images,colors,sizes,category } = req.body;
  console.log(req.body);

  try {
  const product =  await Product.create({
      name,
      price,
      description,
      images,
      category,
      colors,
      sizes

    });
    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error" });
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
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
async function getListOfProducts(req, res) {
  console.log("Req.body", req.body.productIds);

  //find blogs which have ids in the array
  Product.find({ _id: { $in: req.body.productIds } })

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
  const { userid, productid, name, price, description, image } = req.body;
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

          image,
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
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
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
      res.status(200).json(product);
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

const addreviewindb = async (req, res) => {
  try {
    const productId = "6416ea62e450c43bbd81264e";
    const reviewAdded = "test";

    if (!productId || !reviewAdded) {
      return res.status(400).json({ error: "Missing fields: id or review" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.review) {
      product.review = [];
    }

    product.review.push(reviewAdded);

    await product.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addRating = async (req, res) => {
  const { productId, ratingValue } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Generate a random rating between 1 to 5 if ratingValue is null
    const finalRatingValue = ratingValue || Math.floor(Math.random() * 5) + 1;

    if (!product.rating) {
      product.rating = [];
    }
    product.rating.push(finalRatingValue);

    const sum = product.rating.reduce((acc, val) => acc + val, 0);

    const avg = (sum / product.rating.length).toFixed(2);
    product.avgRating = avg;

    await product.save();
    return res.status(200).json({ avgRating: product.avgRating });
  } catch (err) {
    console.log("Error adding rating:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    console.log(req.body.productId);
    // find the SuperAdmin document with the specified ID and populate the "messages" array with Message data
    const product = await Product.findById(req.body.productId);

    // extract the relevant data from the populated "payments" array
    const reviews = product.review;

    // send the extracted data as a response to the frontend
    console.log(reviews);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal sdsdserver error" });
  }
};
const addReview = async (req, res) => {
  try {
    const productId = req.body.productId;
    const reviewAdded = req.body.review;
    console.log("this is type " + typeof productId);
    console.log("this is product id in server " + productId);

    if (!productId || !reviewAdded) {
      return res.status(400).json({ error: "Missing fields: id or review" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.review) {
      product.review = [];
    }

    product.review.push(reviewAdded);

    await product.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
  addreviewindb,
  addRating,
  getReviews,
  addReview,
};
