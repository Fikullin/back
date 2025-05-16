const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guard_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'permissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Permission;