const { User, Item } = require("../../models");
const secret = process.env.SECRET_KEY || "secret";
const stripe = require("stripe")(
  "sk_test_51Inxf4BrsfYSR7wdtjdbggnBwqkcJIff40VxhFzSxaJXo9RDQyUBPtC503pRpU3kjrR4xLUXXGhtD6NwBFkClFXc00jzzyIUZM"
);
const { Op } = require("sequelize");
module.exports.create_item = async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: req.body.title,
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: req.body.price,
      currency: "egp",
    });
    await Item.create({
      price_id: price.id,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      user_id: req.body.user_id,
      quantity: req.body.quantity
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

module.exports.get_all_items_by_user = async (req, res) => {
  try {
    console.log(req.params);
    let itemData = await Item.findAll({
      where: { user_id: req.params.id },
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

module.exports.get_all_items_by_user_and_owners_items = async (req, res) => {
  try {
    let hydrated_user = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: "owner",
          include: [{ model: Item }],
        },
        { model: Item },
      ],
    });

    let all_items = hydrated_user.Items;
    for (let owner of hydrated_user.owner) {
      if (owner.Items && owner.Items.length) {
        all_items.push(...owner.Items);
      }
    }
    console.log(all_items);
    res.json(all_items);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
};

module.exports.edit_item = async (req, res) => {
  // edit a single item by its `id`
  try {
    console.log(req.body);
    let products = await Item.findAll({
      where: { id: req.params.id },
    });
    console.log(products);
    if (!products) {
      res.status(404).json({ message: "item doesn't exist!" });
      return;
    }
    // create a new row object with the updated values you want
    const updatedProduct = Object.assign(req.body);

    // "upsert" that new row
    await Item.upsert(updatedProduct).then(() => res.sendStatus(204));
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports.delete_item = async (req, res) => {
  // delete a single item by its `id`
  try {
    let deletedItemsIDS = req.body.a;

    for (n of deletedItemsIDS) {
      let deletedProduct = await Item.destroy({
        where: { id: n },
      });

      if (!deletedProduct) {
        res.status(404).json({ message: `item ${n} doesn't exist!` });
        return;
      }
    }

    res.json({ message: "item deleted successfully." });
  } catch (e) {
    console.log(e);
    res.status(409).json(e);
  }
};

module.exports.get_all_items = async (req, res) => {
  try {
    let items = await Item.findAll({
      where: { quantity: { [Op.gt]: 0 } },
      include: [User],
    });
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
