const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const ProjectScopeTaskMember = sequelize.define('ProjectScopeTaskMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_scope_task_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'project_scope_task_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ProjectScopeTaskMember;