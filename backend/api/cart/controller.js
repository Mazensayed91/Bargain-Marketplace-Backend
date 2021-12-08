const { CartItem } = require("../../models")

exports.addToCart = async (req, res) => {
    try{
        await CartItem.create({
            user_id: req.user.id,
            item_id: req.body.item_id,
        });

        return res.json({"msg": "Item Added to Cart"});
    }catch(e){
        return res.status(500).json({"error": e.message});
    }
};

exports.removeFromCart = (req, res) => {

};

exports.getUserCart = (req, res) => {

};
