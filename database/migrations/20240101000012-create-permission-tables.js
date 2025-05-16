'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create permissions table
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guard_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Create roles table
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guard_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Create model_has_permissions table
    await queryInterface.createTable('model_has_permissions', {
      permission_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      model_type: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      model_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      }
    });

    // Create model_has_roles table
    await queryInterface.createTable('model_has_roles', {
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      model_type: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      model_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      }
    });

    // Create role_has_permissions table
    await queryInterface.createTable('role_has_permissions', {
      permission_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    // Add indexes
    await queryInterface.addIndex('model_has_permissions', ['model_id', 'model_type']);
    await queryInterface.addIndex('model_has_roles', ['model_id', 'model_type']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_has_permissions');
    await queryInterface.dropTable('model_has_roles');
    await queryInterface.dropTable('model_has_permissions');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('permissions');
  }
};