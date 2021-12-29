const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

let sequelize1;
sequelize1 = new Sequelize(
  config[0].database,
  config[0].username,
  config[0].password,
  config[0]
);
sequelize2 = new Sequelize(
  config[1].database,
  config[1].username,
  config[1].password,
  config[1]
);

sequelize1.dialect.supports.schemas = true;
sequelize2.dialect.supports.schemas = true;

require("./user.js")(sequelize1, Sequelize.DataTypes, config[0]);
require("./item.js")(sequelize2, Sequelize.DataTypes, config[1]);
require("./cartItem.js")(sequelize2, Sequelize.DataTypes, config[1]);

sequelize1.models.User.hasMany(sequelize2.models.Item, {
  foreignKey: "user_id",
});
sequelize2.models.Item.belongsTo(sequelize1.models.User, {
  foreignKey: "user_id",
});
sequelize2.models.Item.hasMany(sequelize2.models.CartItem, {
  foreignKey: "item_id",
});
sequelize2.models.CartItem.belongsTo(sequelize2.models.Item, {
  foreignKey: "item_id",
});
sequelize2.models.CartItem.belongsTo(sequelize1.models.User, {
  foreignKey: "user_id",
});
sequelize1.models.User.hasMany(sequelize2.models.CartItem, {
  foreignKey: "user_id",
});

sequelize1.models.User.belongsToMany(sequelize1.models.User, {as: "owner", through: "vendor_seller", foreignKey: "owner_id"})
sequelize1.models.User.belongsToMany(sequelize1.models.User, {as: "vendor", through: "vendor_seller", foreignKey: "vendor_id"})

module.exports.User = sequelize1.models.User;
module.exports.Item = sequelize2.models.Item;
module.exports.CartItem = sequelize2.models.CartItem;

module.exports.sequelize1 = sequelize1;
module.exports.sequelize2 = sequelize2;
