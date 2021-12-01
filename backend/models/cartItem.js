const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize();


const CartItem = sequelize.define('CartItem', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate(models) {
                // relationships
            },
        },
});

export default CartItem;
