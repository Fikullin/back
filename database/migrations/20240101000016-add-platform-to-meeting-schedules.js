'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('meeting_schedules', 'platform', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('meeting_schedules', 'platform');
  }
};
