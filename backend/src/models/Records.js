const { Model, DataTypes } = require("sequelize");

class Registrations extends Model {
  static init(sequelize) {
    super.init(
      {
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        input: DataTypes.STRING,
        exit: DataTypes.STRING,
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

module.exports = Registrations;
