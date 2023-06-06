import db from '../db/connection';
import { DataTypes } from 'sequelize';
import MaEmpresa from './maempresa';


const MaTienda = db.define('matienda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    xname: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    nstore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    xtelf: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    xaddress: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default MaTienda;