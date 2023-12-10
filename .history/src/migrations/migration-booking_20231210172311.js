'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
      }, patientId: {
        type: Sequelize.INTEGER
      },
      specialtyName: {
        type: Sequelize.STRING
      },
      timeType: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      birthday: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.TEXT
      },
      reasons: {
        type: Sequelize.TEXT
      },
      doctorName: {
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
    await queryInterface.dropTable('bookings');
  }
};