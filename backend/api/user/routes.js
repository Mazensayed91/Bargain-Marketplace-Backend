const router = require("express").Router();
// const auth_middleware = require("../../auth/auth")
const { get_all_users, get_user_by_id, permit_user } = require("./controller");
// router.use(auth_middleware);
router.get("/", get_all_users);
router.get("/:id", get_user_by_id);
router.post("/permit", permit_user)
module.exports = router;
