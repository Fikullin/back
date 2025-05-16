const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  job_scope: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  technician_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  state: {
    type: DataTypes.ENUM('Proposal', 'Ongoing', 'Completed', 'On Hold'),
    defaultValue: 'Proposal'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Project;