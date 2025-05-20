'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('projects');
      
      // Tambahkan kolom description jika belum ada
      if (!tableInfo.description) {
        await queryInterface.addColumn('projects', 'description', {
          type: Sequelize.TEXT,
          allowNull: true
        });
        console.log('Kolom description berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom job_scope jika belum ada
      if (!tableInfo.job_scope) {
        await queryInterface.addColumn('projects', 'job_scope', {
          type: Sequelize.TEXT,
          allowNull: true
        });
        console.log('Kolom job_scope berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom contact_name jika belum ada
      if (!tableInfo.contact_name) {
        await queryInterface.addColumn('projects', 'contact_name', {
          type: Sequelize.STRING,
          allowNull: true
        });
        console.log('Kolom contact_name berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom contact_email jika belum ada
      if (!tableInfo.contact_email) {
        await queryInterface.addColumn('projects', 'contact_email', {
          type: Sequelize.STRING,
          allowNull: true
        });
        console.log('Kolom contact_email berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom contact_phone jika belum ada
      if (!tableInfo.contact_phone) {
        await queryInterface.addColumn('projects', 'contact_phone', {
          type: Sequelize.STRING,
          allowNull: true
        });
        console.log('Kolom contact_phone berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom admin_id jika belum ada
      if (!tableInfo.admin_id) {
        await queryInterface.addColumn('projects', 'admin_id', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
        console.log('Kolom admin_id berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom technician_id jika belum ada
      if (!tableInfo.technician_id) {
        await queryInterface.addColumn('projects', 'technician_id', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
        console.log('Kolom technician_id berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom state jika belum ada
      if (!tableInfo.state) {
        await queryInterface.addColumn('projects', 'state', {
          type: Sequelize.ENUM('Proposal', 'Ongoing', 'Completed', 'On Hold'),
          defaultValue: 'Proposal'
        });
        console.log('Kolom state berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom progress jika belum ada
      if (!tableInfo.progress) {
        await queryInterface.addColumn('projects', 'progress', {
          type: Sequelize.INTEGER,
          defaultValue: 0
        });
        console.log('Kolom progress berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom start_date jika belum ada
      if (!tableInfo.start_date) {
        await queryInterface.addColumn('projects', 'start_date', {
          type: Sequelize.DATE,
          allowNull: true
        });
        console.log('Kolom start_date berhasil ditambahkan ke tabel projects');
      }
      
      // Tambahkan kolom end_date jika belum ada
      if (!tableInfo.end_date) {
        await queryInterface.addColumn('projects', 'end_date', {
          type: Sequelize.DATE,
          allowNull: true
        });
        console.log('Kolom end_date berhasil ditambahkan ke tabel projects');
      }
      
    } catch (error) {
      console.error('Error dalam migrasi:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('projects');
      
      // Hapus kolom-kolom yang ditambahkan
      const columnsToRemove = [
        'description', 'job_scope', 'contact_name', 'contact_email', 
        'contact_phone', 'admin_id', 'technician_id', 'state', 
        'progress', 'start_date', 'end_date'
      ];
      
      for (const column of columnsToRemove) {
        if (tableInfo[column]) {
          await queryInterface.removeColumn('projects', column);
          console.log(`Kolom ${column} berhasil dihapus dari tabel projects`);
        }
      }
      
    } catch (error) {
      console.error('Error dalam rollback migrasi:', error);
      throw error;
    }
  }
};