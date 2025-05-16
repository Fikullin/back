'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@sirams.com',
      password: bcrypt.hashSync('password', 10),
      role: 'admin',
      email_verified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@sirams.com' }, {});
  }
};