"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const MaCliente = connection_1.default.define('macliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    xdni: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    xbusinessname: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
    xtelf: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    xshortaddress: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
    xlongaddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true,
    },
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = MaCliente;
