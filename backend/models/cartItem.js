const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./db")
const {User} = require("./user");
const {Item} = require("./Item");


let CartItem = sequelize.define('CartItem', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        classMethods: {
            associate(models) {
                // relationships
            },
        },
});

CartItem.belongsTo(User);
CartItem.belongsTo(Item);

module.exports.CartItem = CartItem;