import db from '../db/connection';
import { DataTypes } from 'sequelize';


const SeUsuario = db.define('seusuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    xcodeemployee: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: true,
    },
    nrol: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    xfirstname: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    xlastname: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    xusername: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: {
            name: "Validation - unique value en xusario",
            msg: 'El email necesita ser unico',
        },
    },
    xpassword: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default SeUsuario;