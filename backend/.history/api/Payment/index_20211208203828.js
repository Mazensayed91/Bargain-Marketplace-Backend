module.exports.payment = () => async (req, res) => {
  console.log("hey");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/?success=true`,
    cancel_url: `http://localhost:3000/?canceled=true`,
  });

  res.redirect(303, session.url);
};
