import Sequelize from "sequelize";
import dbConfig from "../config/database.js";

import Product from "../models/product.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import OrderStatus from "../models/OrderStatus.js";

const sequelize = new Sequelize(dbConfig);

Product.init(sequelize);
Order.init(sequelize);
OrderItem.init(sequelize);
OrderStatus.init(sequelize);

Order.associate(sequelize.models);
OrderItem.associate(sequelize.models);

export default sequelize;
