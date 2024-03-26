const { DataTypes } = require("sequelize");
const { dbSequelize } = require("../DatabaseService/index");

export const Subscription = dbSequelize.define("subscriptions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userUniqueId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Subscription;
