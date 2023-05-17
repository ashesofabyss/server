import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Product = db.define('product', {
  name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE
  },

}, {
  schema: 'inventories', 
  tableName: 'products', 
  createdAt: false,
  updatedAt: false
});

export default Product;