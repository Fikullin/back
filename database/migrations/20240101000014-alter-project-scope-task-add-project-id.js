'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists before adding it
    try {
      const tableInfo = await queryInterface.describeTable('project_scope_tasks');
      if (!tableInfo.project_id) {
        await queryInterface.addColumn('project_scope_tasks', 'project_id', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'projects',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
      }
    } catch (error) {
      console.log('Migration error:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('project_scope_tasks');
      if (tableInfo.project_id) {
        await queryInterface.removeColumn('project_scope_tasks', 'project_id');
      }
    } catch (error) {
      console.log('Migration rollback error:', error.message);
    }
  }
};