'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Periksa apakah admin sudah ada
    const adminExists = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE email = 'admin@sirams.com'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    // Hanya insert jika admin belum ada
    if (adminExists.length === 0) {
      return queryInterface.bulkInsert('users', [{
        name: 'Admin',
        email: 'admin@sirams.com',
        password: bcrypt.hashSync('password', 10),
        role: 'admin',
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }]);
    }
    
    console.log('Admin user already exists, skipping seed');
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@sirams.com' }, {});
  }
};