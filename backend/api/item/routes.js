const router = require('express').Router();
const {get_item, edit_item, create_item} = require("../")


router.get('/:id', async (req, res) => {
    await get_item(req, res)
})

router.post('/', async (req, res) => {
    await create_item(req, res);
})

router.put('/:id', async (req, res) => {
    await edit_item(req, res)
})