// add routes for cartItem
const { deposit } = require("./controller")
const express = require("express");
const router = express.Router();


router.post('/', deposit)
