import { Model, DataTypes } from "sequelize";
import OrderStatus from "./OrderStatus.js";

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          autoIncrement: true,
          primaryKey: true,
        },
        total_value: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        client_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        order_status_id: {
          type: DataTypes.INTEGER,
          references: {
            model: OrderStatus,
            key: "id",
          },
        },
        delivery_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    Order.belongsTo(OrderStatus, { foreignKey: "order_status_id" });
  }
}
