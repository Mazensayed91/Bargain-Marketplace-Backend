const router = require("express").Router();
const { Payment } = require("./index");

router.post("create-checkout-session", Payment);
