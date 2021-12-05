const sequelize = require("./db");
const {User} = require("./user");
const {Item} = require("./Item");
const CartItem = require("./cartItem");
const db = {User, CartItem, Item};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
