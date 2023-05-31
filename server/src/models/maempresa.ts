import db from '../db/connection';
import { DataTypes } from 'sequelize';


const MaEmpresa = db.define('maempresa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xrif: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    xshortname: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    xlongname: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    xaddress: {
        type: DataTypes.STRING(250),
        allowNull: false,
    }
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default MaEmpresa;