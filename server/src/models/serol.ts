import db from '../db/connection';
import { DataTypes } from 'sequelize';
import SeUsuario from './seusuario';


const SeRol = db.define('serol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        // references: {
        //     model: SeUsuario,
        //     key: 'id',
        // },
    },
    xrol: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'seroles'
    // createdAt: false,
    // updatedAt: false,
});

// (async () => {
//     await SeRol.sync();
//     // Code here
// })();

// (async () => {
//     await SeRol.hasMany(SeUsuario);
//     // Code here
// })();

export default SeRol;