const express = require('express');
const { getProducts,addProduct,getListOfProducts, delProduct, editproduct, addtocart, getfromcart,getproduct, editQuantityinCart, stripePayment } = require("../controllers/products.controller");

const router = express.Router();

router.post("/addproduct", addProduct)
router.post('/get',getListOfProducts)
router.get("/getProducts", getProducts)
router.delete("/delproduct/:Id", delProduct)
router.put("/editproduct/:Id", editproduct)
router.post("/addtocart",addtocart)
router.post("/getfromcart",getfromcart)
router.get("/getproduct/:productId", getproduct)
router.put("/editquantityincart", editQuantityinCart),
router.post("/stripe/charge", stripePayment ) 

module.exports = router;

