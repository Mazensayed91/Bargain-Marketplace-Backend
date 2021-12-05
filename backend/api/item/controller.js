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