'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentNumber: {
        type: Sequelize.INTEGER
      },
      maxNumber: {
        type: Sequelize.INTEGER
      },
      timeTYPE: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
      date:{
type: Sequelize.STRING
      },
      priceId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};