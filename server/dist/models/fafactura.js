"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    // xmaempresa: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // },
    // xmatienda: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // },
    ncaja: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    // xfnameuser: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    //     unique: {
    //         name: "Validation - unique value en xusario",
    //         msg: 'El email necesita ser unico',
    //     },
    // },
    // xpassword: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // }
}, {
// createdAt: false,
// updatedAt: false,
});
// (async () => {
//     //     await SeRol.sync();
//     //     // Code here
//     })();
(() => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = FaFactura;
