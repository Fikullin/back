'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      queue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payload: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      attempts: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      reserved_at: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      available_at: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.addIndex('jobs', ['queue']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};