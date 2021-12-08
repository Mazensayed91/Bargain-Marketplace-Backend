const router = require("express").Router();
const { payment } = require("./index");

router.post("create-checkout-session", payment);
module.exports = router;
