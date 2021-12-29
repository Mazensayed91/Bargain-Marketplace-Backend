const { Item, User } = require("../../models");
const sequelize = require("sequelize");
const stripe = require("stripe")(
  "sk_test_51Inxf4BrsfYSR7wdtjdbggnBwqkcJIff40VxhFzSxaJXo9RDQyUBPtC503pRpU3kjrR4xLUXXGhtD6NwBFkClFXc00jzzyIUZM"
);

module.exports.payment = async (req, res) => {
  let products = req.body.products;
  const session = await stripe.checkout.sessions.create({
    line_items: products.map((product) => ({
      price: product.price,
      quantity: product.quantity,
    })),
    //  [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: "price_1Inxj8BrsfYSR7wdz6gPaAEK",
    //     quantity: 1,
    //   },
    // ]
    mode: "payment",
    success_url: `http://localhost:3000/?success=true`,
    cancel_url: `http://localhost:3000/?canceled=true`,
  });

  res.redirect(303, session.url);
};

module.exports.checkout = async (req, res) => {
  /**
   * 0: {seller_id: 3, item_id: 7, buyer_id: 3, quantity: 1}
1: {seller_id: 2, item_id: 5, buyer_id: 3, quantity: 1}
2: {seller_id: 5, item_id: 6, buyer_id: 3, quantity: 8}
3: {seller_id: 3, item_id: 2, buyer_id: 3, quantity: 1}
4: {seller_id: 1, item_id: 1, buyer_id: 3, quantity: 1}
   */

  // Model.update({ field: sequelize.literal('field + 2') }, { where: { id: model_id } });
  try{
    let overall = 0;
    for (let cart_item of req.body.items) {
      let item = await Item.findOne({ where: { id: cart_item.item_id } });
      let price = item.price * cart_item.quantity;
      overall += price;
      let seller = await User.findOne({ where: { id: cart_item.seller_id } });
      await seller.update({ balance: seller.balance - price });
    }
    await User.update({ balance: sequelize.literal(`balance - ${overall}`) }, { where: { id: req.body.items[0].buyer_id } })
    res.json({"message": "does"});
  }catch(e) {
    res.status(500).json({'error': e.message});
  }
}