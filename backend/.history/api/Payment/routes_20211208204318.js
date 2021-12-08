const router = require("express").Router();
const { Payment } = require("./index");

module.exports.router.post("create-checkout-session", Payment);
