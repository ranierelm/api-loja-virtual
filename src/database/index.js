import Sequelize from 'sequelize';
import dbConfig from '../config/database.js';

const sequelize = new Sequelize(dbConfig);

export default sequelize;