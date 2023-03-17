const express = require('express');
const router = express.Router();
const {orderReceived, OrdersToTemplate} = require("../controllers/orders.controller")


router.post("/orderreceived", orderReceived)
router.put("/addordersintemplate", OrdersToTemplate)


module.exports = router;