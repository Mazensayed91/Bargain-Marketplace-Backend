// add routes for cartItem
const { addToCart, getUserCart, removeFromCart } = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/add", addToCart);
router.get("/:user_id", getUserCart);
router.delete("/:item_id", removeFromCart);

module.exports = router;
