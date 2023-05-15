import db from '../db/connection';
import { DataTypes } from 'sequelize';


const MaProducto = db.define('maproducto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    // createdAt: false,
    // updatedAt: false,
}
);

export default MaProducto;