const router = require('express').Router();
const {get_item, edit_item, create_item, delete_item, get_all_items} = require("./controller")


router.get('/:id', get_item)

router.post('/', create_item)

router.put('/:id', edit_item)

router.delete('/:id', delete_item)

router.get('/', get_all_items)

module.exports = router;