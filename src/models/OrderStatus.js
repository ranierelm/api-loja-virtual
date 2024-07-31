import { Model, DataTypes } from "sequelize";

export default class OrderStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OrderStatus",
        tableName: "order_status",
        underscored: true,
        timestamps: false,
      }
    );
  }
}
