"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const SeRol = connection_1.default.define('serol', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        // references: {
        //     model: SeUsuario,
        //     key: 'id',
        // },
    },
    xrol: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'seroles'
    // createdAt: false,
    // updatedAt: false,
});
// (async () => {
//     await SeRol.sync();
//     // Code here
// })();
// (async () => {
//     await SeRol.hasMany(SeUsuario);
//     // Code here
// })();
exports.default = SeRol;
