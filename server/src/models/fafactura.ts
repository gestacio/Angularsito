import db from '../db/connection';
import { DataTypes } from 'sequelize';


const FaFactura = db.define('fafactura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ncaja: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },

}, {

});

export default FaFactura;