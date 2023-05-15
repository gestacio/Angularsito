"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuramos las variables de entorno
dotenv_1.default.config();
// Sincronizamos sequelize
// function sincronizar() async {
//     await sequelize.sync({ force: true });
//     console.log("All models were synchronized successfully.");
// }
const server = new server_1.default();
