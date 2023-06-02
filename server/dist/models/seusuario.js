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
    xcodeemployee: {
        type: sequelize_1.DataTypes.CHAR(8),
        allowNull: false,
        unique: true,
    },
    nrol: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    xfnmae: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    xlname: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    xusername: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        unique: {
            name: "Validation - unique value en xusario",
            msg: 'El email necesita ser unico',
        },
    },
    xpassword: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    }
}, {
// createdAt: false,
// updatedAt: false,
});
exports.default = SeUsuario;
