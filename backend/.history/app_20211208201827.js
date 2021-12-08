// Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AuthRouter, ItemsRouter, UsersRouter } = require("./api/index");
const stripe = require("stripe")(
  "sk_test_51Inxf4BrsfYSR7wdtjdbggnBwqkcJIff40VxhFzSxaJXo9RDQyUBPtC503pRpU3kjrR4xLUXXGhtD6NwBFkClFXc00jzzyIUZM"
);
const { Payment } = require("./api/Payment");
// Start up an instance of app

const app = express();
// const db = require('./models');//------
//const loginRouter = require('./api/index') ///-----

// Cors for cross origin allowance and security
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json());
app.use("/auth", AuthRouter); //----------
app.use("/items", ItemsRouter);
app.use("/users", UsersRouter);
app.use("/", Payment);
// Routes
app.get("/", (req, res) => {
  res.send("Hello to dist project api");
});

// module.exports.db = db;
module.exports = app;
