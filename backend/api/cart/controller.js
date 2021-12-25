const { CartItem, Item } = require("../../models");

const { Op } = require("sequelize");

exports.addToCart = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.body.item_id, quantity: { [Op.gt]: 0 } },
    });
    if (!item) return res.status(400).send("Item is out of stock");
    const cart_item = await CartItem.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    await item.update({
      quantity: item.quantity - 1,
    });
    console.log("from addto cart", item.quantity);
    return res.json({ item: cart_item });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.removeFromCart = (req, res) => {};

exports.getUserCart = async (req, res) => {
  try {
    const cart_items = await CartItem.findAll({
      where: { user_id: req.params.user_id },
      include: [Item],
    });
    console.log("from get cart");
    return res.json({ cart: cart_items });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
