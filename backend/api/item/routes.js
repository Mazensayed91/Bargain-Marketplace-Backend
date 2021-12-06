const router = require('express').Router();
const {get_item, edit_item, create_item, delete_item, get_all_items} = require("./controller")


router.get('/:id', async (req, res) => {
    await get_item(req, res)
})

router.post('/', async (req, res) => {
    await create_item(req, res);
})

router.put('/:id', async (req, res) => {
    await edit_item(req, res)
})

router.delete('/:id', async (req, res) => {
    await delete_item(req, res)
})

router.get('/', async (req, res) => {
    await get_all_items(req, res)
})