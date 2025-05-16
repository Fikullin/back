const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const ProjectScopeTaskAttachment = sequelize.define('ProjectScopeTaskAttachment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_scope_task_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'project_scope_task_attachments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ProjectScopeTaskAttachment;