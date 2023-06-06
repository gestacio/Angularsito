"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('almacen', 'sa', 'Seguros!', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "-04:00"
    },
    timezone: "-04:00", //for writing to database
});
exports.default = sequelize;
