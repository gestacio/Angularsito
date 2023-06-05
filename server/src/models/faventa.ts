import db from '../db/connection';
import { DataTypes } from 'sequelize';


const FaVenta = db.define('faventa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xidproduct: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    xproduct: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,

    },
}, {
    // createdAt: false,
    // updatedAt: false,
});


export default FaVenta;