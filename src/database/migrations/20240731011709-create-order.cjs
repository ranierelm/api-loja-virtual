"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "order_status",
          key: "id",
        },
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
