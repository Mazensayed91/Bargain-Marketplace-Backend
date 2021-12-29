const router = require("express").Router();
const { payment, checkout } = require("./index");

router.post("/create-checkout-session", payment);
router.post("/checkout", checkout);

module.exports = router;
