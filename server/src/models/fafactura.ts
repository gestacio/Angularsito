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
    mneto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    miva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    mtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

}, {
    
});

export default FaFactura;