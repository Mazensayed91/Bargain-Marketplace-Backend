// add routes for cartItem
const { addToCart, getUserCart } = require("./controller")
const express = require("express");
const router = express.Router();


router.post("/add", addToCart);
router.get("/:id", getUserCart);

module.exports = router;