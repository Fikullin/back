'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cache', {
      key: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      expiration: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.createTable('cache_locks', {
      key: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      owner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expiration: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cache_locks');
    await queryInterface.dropTable('cache');
  }
};