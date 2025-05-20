'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Periksa apakah kolom attachment sudah ada
      const tableInfo = await queryInterface.describeTable('tasks');
      
      if (!tableInfo.attachment) {
        await queryInterface.addColumn('tasks', 'attachment', {
          type: Sequelize.TEXT,
          allowNull: true
        });
      } else {
        console.log('Kolom attachment sudah ada di tabel tasks, melewati migrasi ini.');
      }
    } catch (error) {
      console.error('Error dalam migrasi:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('tasks');
      
      if (tableInfo.attachment) {
        await queryInterface.removeColumn('tasks', 'attachment');
      }
    } catch (error) {
      console.error('Error dalam rollback migrasi:', error);
      throw error;
    }
  }
};