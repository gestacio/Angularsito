import db from '../db/connection';
import { DataTypes } from 'sequelize';
import MaEmpresa from './maempresa';
import MaTienda from './matienda';
import SeUsuario from './seusuario';
import MaCliente from './macliente';


const FaFactura = db.define('fafactura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // xmaempresa: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // },
    // xmatienda: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // },
    ncaja: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    // xfnameuser: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    //     unique: {
    //         name: "Validation - unique value en xusario",
    //         msg: 'El email necesita ser unico',
    //     },
    // },
    // xpassword: {
    //     type: DataTypes.STRING(40),
    //     allowNull: false,
    // }
}, {
    // createdAt: false,
    // updatedAt: false,
});

// (async () => {
//     //     await SeRol.sync();
//     //     // Code here
//     })();

(async () => {

})

export default FaFactura;