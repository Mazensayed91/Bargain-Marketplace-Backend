const {User, Item} = require("../../models");

const secret = process.env.SECRET_KEY || 'secret';

module.exports.create_item = async (req, res) => {
    try{
        await Item.create({
            title: req.body.title,
            image_url: req.body.image_url,
            description: req.body.description,
            price: req.body.price,
            user_id: req.body.user_id,
        });
        res.json({"msg": "item created"});
    }catch(e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}


module.exports.get_item = async(req, res) => {
    // find a single item by its `id`
    try {
        let itemData = await Item.findOne({
            where: {id: req.params.id},
        })
        if (!itemData) {
            res.status(404).json({message: "item not found."});
            return;
        }
        res.json(itemData)
    }catch(e){
        console.log(e)
    }
};


module.exports.edit_item = async(req, res) => {
    // edit a single item by its `id`
    try {
        let products = await Item.findAll({
            where: { product_id: req.params.id },
        })

        if (!products) {
            res.status(404).json({message: "item doesn't exist!"});
            return;
        }
        // create a new row object with the updated values you want
        const updatedProduct = Object.assign({}, req.body, {
            item: req.body.item
        });

        // "upsert" that new row
        products.upsert(updatedProduct)
            .then(() => res.sendStatus(204))
    } catch (e) {
        console.log(e)
    }
};

module.exports.delete_item = async(req, res) => {
    // delete a single item by its `id`
    try {

        let deletedProduct = await Item.destroy({
            where: {id: req.params.id}
        })

        if (!deletedProduct) {
            res.status(404).json({message: "item doesn't exist!"});
            return;
        }

        res.json({ message: 'item deleted successfully.' });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};
