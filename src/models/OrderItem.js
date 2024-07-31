import { Model, DataTypes } from "sequelize";

export default class OrderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "orders",
            key: "id",
          },
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "products",
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        unit_price: {
          type: DataTypes.FLOAT,
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
        modelName: "OrderItem",
        tableName: "order_items",
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}
