'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('users');
      
      if (!tableInfo.phone) {
        await queryInterface.addColumn('users', 'phone', {
          type: Sequelize.STRING,
          allowNull: true
        });
        console.log('Kolom phone berhasil ditambahkan ke tabel users');
      } else {
        console.log('Kolom phone sudah ada di tabel users, melewati migrasi ini.');
      }
    } catch (error) {
      console.error('Error dalam migrasi:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('users');
      
      if (tableInfo.phone) {
        await queryInterface.removeColumn('users', 'phone');
        console.log('Kolom phone berhasil dihapus dari tabel users');
      }
    } catch (error) {
      console.error('Error dalam rollback migrasi:', error);
      throw error;
    }
  }
};