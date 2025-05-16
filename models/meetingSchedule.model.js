const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const MeetingSchedule = sequelize.define('MeetingSchedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  meeting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'meeting_schedules',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = MeetingSchedule;