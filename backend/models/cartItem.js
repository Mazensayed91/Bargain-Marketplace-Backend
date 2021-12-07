
module.exports = (sequelize, DataTypes, config) => {
    sequelize.define('CartItem', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        schema: config.database,
        tableName: "CartItem"
    });
}