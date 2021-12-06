const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./db")
const {User} = require("./user");


let Item = sequelize.define("Item", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    }, {underscored: true});
    //return User;

Item.belongsTo(User);
module.exports.Item = Item;