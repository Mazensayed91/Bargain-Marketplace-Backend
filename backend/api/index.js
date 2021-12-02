// one api router to role them all
const express = require("express");
const router = express.Router();

const main = require('./Authnticate/controller')

router.get('/', main);

module.exports = router