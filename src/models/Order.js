import { Model, DataTypes } from "sequelize";

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
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        client_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        order_status_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "order_status",
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
  }
  static associate(models) {
    this.belongsTo(models.OrderStatus, {
      foreignKey: "order_status_id",
      as: "status",
    });
  }
}
