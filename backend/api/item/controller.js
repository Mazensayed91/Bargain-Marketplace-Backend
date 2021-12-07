const { User, Item } = require("../../models");
const secret = process.env.SECRET_KEY || "secret";

module.exports.create_item = async (req, res) => {
  try {
    await Item.create({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      user_id: req.body.user_id,
    });
    res.status(201).json({ msg: "item created" });
  } catch (e) {
    console.log(e);
    res.status(409).json({ message: e.message });
  }
};

module.exports.get_item = async (req, res) => {
  // find a single item by its `id`
  try {
    let itemData = await Item.findOne({
      where: { id: req.params.id },
    });
    if (!itemData) {
      res.status(404).json({ message: "item not found." });
      return;
    }
    res.json(itemData);
  } catch (e) {
    console.log(e);
  }
};

module.exports.edit_item = async (req, res) => {
  // edit a single item by its `id`
  try {
    let products = await Item.findAll({
      where: { product_id: req.params.id },
    });

    if (!products) {
      res.status(404).json({ message: "item doesn't exist!" });
      return;
    }
    // create a new row object with the updated values you want
    const updatedProduct = Object.assign({}, req.body, {
      item: req.body.item,
    });

    // "upsert" that new row
    products.upsert(updatedProduct).then(() => res.sendStatus(204));
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports.delete_item = async (req, res) => {
  // delete a single item by its `id`
  try {
    let deletedProduct = await Item.destroy({
      where: { id: req.params.id },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: "item doesn't exist!" });
      return;
    }

    res.json({ message: "item deleted successfully." });
  } catch (e) {
    console.log(e);
    res.status(409).json(e);
  }
};

module.exports.get_all_items = async (req, res) => {
  try {
    let items = await Item.findAll({ include: [User] });
    res.status(200).json(items);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

module.exports.get_all_users = async (req, res) => {
  try {
    let users = await User.findAll();

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e.message });
  }
};
