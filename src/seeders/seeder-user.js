'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345678',
      firstName: 'Bao',
      lastName: 'Phuc',
      address: 'VN',
      phoneNumber: '0981943577',
      gender: 1,
      image: 'Hong co dau',
      roleId: '1',
      positionId: '1',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
