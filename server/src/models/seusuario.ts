import db from '../db/connection';
import { DataTypes } from 'sequelize';
import SeRol from './serol';


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
});

// (async () => {
//     //     await SeRol.sync();
//     //     // Code here
//     })();

// (async () => {
//     SeUsuario.belongsTo(SeRol)
// })

export default SeUsuario;