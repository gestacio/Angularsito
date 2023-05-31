"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const MaEmpresa = connection_1.default.define('maempresa', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xrif: {
        type: sequelize_1.DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    xshortname: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    xlongname: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    },
    xaddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    }
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = MaEmpresa;
