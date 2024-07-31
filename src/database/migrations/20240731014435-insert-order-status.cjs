"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_status", [
      { title: "Pendente" },
      { title: "Faturado" },
      { title: "Cancelado" },
      { title: "Entregue" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_status", null, {});
  },
};
