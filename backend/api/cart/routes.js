// add routes for cartItem
const { addToCart } = require("./controller")
const express = require("express");
const router = express.Router();


router.post("/add", addToCart);

module.exports = router;