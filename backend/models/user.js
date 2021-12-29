module.exports = (sequelize, DataTypes, config) => {

  sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0,
        },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      schema: config.database,
      tableName: "User",
    }
  );
};
