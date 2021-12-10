const router = require("express").Router();
const { get_all_users, get_user_by_id } = require("./controller");

router.get("/", get_all_users);
router.get("/:id", get_user_by_id);
module.exports = router;
