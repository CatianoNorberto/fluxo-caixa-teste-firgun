const { Model, DataTypes } = require("sequelize");

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        balance: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Balance;
