// add routes for cartItem
const { addToCart, getUserCart, removeFromCart } = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/add", addToCart);
router.get("/:user_id", getUserCart);
router.delete("/", removeFromCart);

module.exports = router;
