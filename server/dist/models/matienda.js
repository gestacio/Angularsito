"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const MaTienda = connection_1.default.define('matienda', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    xname: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    nstore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    xtelf: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    xaddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    },
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = MaTienda;
