import db from '../db/connection';
import { DataTypes } from 'sequelize';


const SeUsuario = db.define('seusuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xnombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    xapellido: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    xusuario: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    xclave: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default SeUsuario;