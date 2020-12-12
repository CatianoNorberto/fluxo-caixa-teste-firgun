const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Registrations = require("../models/Records");
const UserBalance = require("../models/UserBalance");

const connection = new Sequelize(dbConfig);

User.init(connection);
Registrations.init(connection);
UserBalance.init(connection);

User.associate(connection.models);
Registrations.associate(connection.models);
UserBalance.associate(connection.models);

module.exports = connection;
