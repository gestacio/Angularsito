import sequelize from "sequelize/types/sequelize";
import Server from "./server";
import dotenv from 'dotenv';

// Configuramos las variables de entorno
dotenv.config();

// Sincronizamos sequelize
// function sincronizar() async {
//     await sequelize.sync({ force: true });
//     console.log("All models were synchronized successfully.");
// }

const server = new Server();