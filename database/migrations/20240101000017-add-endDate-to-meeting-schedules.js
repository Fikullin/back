'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('meeting_schedules', 'endDate', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('meeting_schedules', 'endDate');
  }
};
