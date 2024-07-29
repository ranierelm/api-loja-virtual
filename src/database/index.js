import Sequelize from 'sequelize';
import dbConfig from '../config/database.js';

import Product from '../models/product.js'

const sequelize = new Sequelize(dbConfig);

Product.init(sequelize);

export default sequelize;