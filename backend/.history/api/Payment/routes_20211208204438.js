const router = require("express").Router();
const { payment } = require("./index");

router.post("create-checkout-session", Payment);
module.exports = router;
