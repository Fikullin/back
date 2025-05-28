'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop default before altering type
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" DROP DEFAULT;');

    // Rename old enum type
    await queryInterface.sequelize.query('ALTER TYPE "enum_tasks_scope" RENAME TO "enum_tasks_scope_old";');

    // Create new enum type with additional values
    await queryInterface.sequelize.query('CREATE TYPE "enum_tasks_scope" AS ENUM(\'project\', \'task\', \'invoice\', \'activity\', \'member\');');

    // Alter column to new enum type
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" TYPE "enum_tasks_scope" USING "scope"::text::"enum_tasks_scope";');

    // Set default back to \'project\'
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" SET DEFAULT \'project\';');

    // Drop old enum type - must be done after altering the column type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_scope_old";');
  },

  down: async (queryInterface, Sequelize) => {
    // Drop default before altering type
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" DROP DEFAULT;');

    // Create old enum type
    await queryInterface.sequelize.query('CREATE TYPE "enum_tasks_scope_old" AS ENUM(\'project\', \'task\', \'invoice\');');

    // Alter column to old enum type
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" TYPE "enum_tasks_scope_old" USING "scope"::text::"enum_tasks_scope_old";');

    // Set default back to \'project\'
    await queryInterface.sequelize.query('ALTER TABLE "tasks" ALTER COLUMN "scope" SET DEFAULT \'project\';');

    // Drop new enum type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_scope";');

    // Rename old enum type back
    await queryInterface.sequelize.query('ALTER TYPE "enum_tasks_scope_old" RENAME TO "enum_tasks_scope";');
  }
};
