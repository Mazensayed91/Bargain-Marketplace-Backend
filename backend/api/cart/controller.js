const { CartItem, Item } = require("../../models");

exports.addToCart = async (req, res) => {
  try {
    const cart_item = await CartItem.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });

    return res.json({ item: cart_item });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let cart_item = await CartItem.findOne({
      where: { id: req.body.id },
      include: [Item],
    });
    await cart_item.Item.update({ quantity: cart_item.Item.quantity + 1 });
    await cart_item.destroy();
    return res.json({ message: "Item removed from cart" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const cart_items = await CartItem.findAll({
      where: { user_id: req.params.user_id },
      include: [Item],
    });
    return res.json({ cart: cart_items });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
