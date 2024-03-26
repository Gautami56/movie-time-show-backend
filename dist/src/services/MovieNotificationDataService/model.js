"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { DataTypes } = require("sequelize");
const { dbSequelize } = require("../DatabaseService/index");
exports.User = dbSequelize.define("notifications", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiryInDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
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
module.exports = exports.User;
