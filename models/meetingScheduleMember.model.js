const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const MeetingScheduleMember = sequelize.define('MeetingScheduleMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  meeting_schedule_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'meeting_schedules',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'meeting_schedule_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = MeetingScheduleMember;
