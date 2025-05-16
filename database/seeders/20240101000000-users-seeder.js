'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('password', 10),
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: await bcrypt.hash('password', 10),
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};