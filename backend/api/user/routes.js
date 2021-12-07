const router = require('express').Router();
const {get_all_users} = require("./controller")

router.get('/', get_all_users)

module.exports = router;