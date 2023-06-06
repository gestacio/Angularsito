import { Sequelize } from "sequelize";

const sequelize = new Sequelize('almacen', 'sa', 'Seguros!', {
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

export default sequelize;