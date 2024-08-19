'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password245', 10);

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Func',
        lastName: 'Alex',
        phoneNumber: '1234567890',
        email: 'alex.f@example.com',
        password: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Bihh',
        lastName: 'Black',
        phoneNumber: '0987654321',
        email: 'bihh.be@example.com',
        password: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
