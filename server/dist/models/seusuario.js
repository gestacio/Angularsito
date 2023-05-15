"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const SeUsuario = connection_1.default.define('seusuario', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xnombre: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    xapellido: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    xusuario: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    xclave: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    }
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = SeUsuario;
