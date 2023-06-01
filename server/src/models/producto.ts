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
        type: DataTypes.DECIMAL(10, 2)
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