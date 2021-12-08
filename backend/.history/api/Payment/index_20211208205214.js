const stripe = require("stripe")(
  "sk_test_51Inxf4BrsfYSR7wdtjdbggnBwqkcJIff40VxhFzSxaJXo9RDQyUBPtC503pRpU3kjrR4xLUXXGhtD6NwBFkClFXc00jzzyIUZM"
);
let price_id = 50;
module.exports.payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1Inxj8BrsfYSR7wdz6gPaAEK",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/?success=true`,
    cancel_url: `http://localhost:3000/?canceled=true`,
  });

  res.redirect(303, session.url);
};
