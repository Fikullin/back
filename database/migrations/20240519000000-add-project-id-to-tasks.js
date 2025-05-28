'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('tasks');

    // Tambahkan kolom attachment jika belum ada
    if (!tableInfo.attachment) {
      await queryInterface.addColumn('tasks', 'attachment', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    // Tambahkan kolom status_description jika belum ada
    if (!tableInfo.status_description) {
      await queryInterface.addColumn('tasks', 'status_description', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    // Tambahkan kolom scope jika belum ada
    if (!tableInfo.scope) {
      await queryInterface.addColumn('tasks', 'scope', {
        type: Sequelize.ENUM('project', 'task', 'invoice'),
        defaultValue: 'project',
        allowNull: false
      });
    }

    // Tambahkan kolom assigned_to jika belum ada
    if (!tableInfo.assigned_to) {
      await queryInterface.addColumn('tasks', 'assigned_to', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    }

    // Tambahkan kolom completed jika belum ada
    if (!tableInfo.completed) {
      await queryInterface.addColumn('tasks', 'completed', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      });
    }

    // Fix for project_id column: allow null first
    if (!tableInfo.project_id) {
      await queryInterface.addColumn('tasks', 'project_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'projects',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }

    // Update existing tasks with null project_id to a default project_id (e.g., 1)
    await queryInterface.sequelize.query(`
      UPDATE tasks
      SET project_id = 1
      WHERE project_id IS NULL;
    `);

    // Alter project_id column to set NOT NULL constraint
    await queryInterface.changeColumn('tasks', 'project_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('tasks');

    // Hapus kolom-kolom yang ditambahkan
    if (tableInfo.attachment) {
      await queryInterface.removeColumn('tasks', 'attachment');
    }

    if (tableInfo.status_description) {
      await queryInterface.removeColumn('tasks', 'status_description');
    }

    if (tableInfo.scope) {
      await queryInterface.removeColumn('tasks', 'scope');
    }

    if (tableInfo.assigned_to) {
      await queryInterface.removeColumn('tasks', 'assigned_to');
    }

    if (tableInfo.completed) {
      await queryInterface.removeColumn('tasks', 'completed');
    }

    if (tableInfo.project_id) {
      await queryInterface.removeColumn('tasks', 'project_id');
    }
  }
};
