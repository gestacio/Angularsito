"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const FaFactura = connection_1.default.define('fafactura', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ncaja: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    mneto: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    niva: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    mtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {});
exports.default = FaFactura;
