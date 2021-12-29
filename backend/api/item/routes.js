const router = require("express").Router();
const {
  get_item,
  edit_item,
  create_item,
  delete_item,
  get_all_items,
  get_all_items_by_user,
  get_all_items_by_user_and_owners_items
} = require("./controller");

router.get("/:id", get_item);

router.post("/", create_item);

router.put("/:id", edit_item);

router.delete("/delete", delete_item);

router.get("/user/:id", get_all_items_by_user_and_owners_items);

router.get("/", get_all_items);

module.exports = router;
