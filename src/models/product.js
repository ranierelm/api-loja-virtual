import { Model, DataTypes } from "sequelize";

export default class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        ean: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        last_purchase_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "products",
        underscored: true,
      }
    );
  }
}
