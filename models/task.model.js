const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'title'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  attachment: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('attachment');
      return rawValue ? rawValue.split(',') : [];
    },
    set(val) {
      this.setDataValue('attachment', Array.isArray(val) ? val.join(',') : val);
    }
  },
  status_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  scope: {
    type: DataTypes.ENUM('project', 'task', 'invoice', 'activity', 'member'),
    defaultValue: 'project'
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
      // Tambahkan custom validator untuk mengizinkan null
      customValidator(value) {
        if (value === '') {
          // Jika string kosong, ubah menjadi null
          this.setDataValue('assigned_to', null);
        }
      }
    }
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'blocked'),
    defaultValue: 'not_started'
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true
});

module.exports = Task;
