'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists before adding it
    const tableInfo = await queryInterface.describeTable('tasks');
    if (!tableInfo.email_sent) {
      await queryInterface.addColumn('tasks', 'email_sent', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('tasks');
    if (tableInfo.email_sent) {
      await queryInterface.removeColumn('tasks', 'email_sent');
    }
  }
};