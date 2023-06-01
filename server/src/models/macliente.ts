import db from '../db/connection';
import { DataTypes } from 'sequelize';


const MaCliente = db.define('macliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    xdni: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    xbusinessname: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    xtelf: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    xshortaddress: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    xlongaddress: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default MaCliente;