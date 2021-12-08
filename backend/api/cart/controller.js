const { CartItem } = require("../../models")

exports.addToCart = async (req, res) => {
    try{
        const cart_item = await CartItem.create({
            user_id: req.body.user_id,
            item_id: req.body.item_id,
        });

        return res.json({"item": cart_item});
    }catch(e){
        return res.status(500).json({"error": e.message});
    }
};

exports.removeFromCart = (req, res) => {

};

exports.getUserCart = (req, res) => {

};
