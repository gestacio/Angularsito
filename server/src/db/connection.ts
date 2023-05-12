import { Sequelize } from "sequelize";

const sequelize = new Sequelize('almacen', 'sa', 'Seguros!', {
    host: 'localhost',
    dialect: 'mssql',
  });

export default sequelize;