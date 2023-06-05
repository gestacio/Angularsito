"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const FaVenta = connection_1.default.define('faventa', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xidproduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    xproduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mprice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = FaVenta;
