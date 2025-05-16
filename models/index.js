const User = require('./user.model');
const Project = require('./project.model');
const ProjectScope = require('./projectScope.model');
const ProjectScopeTask = require('./projectScopeTask.model');
const ProjectScopeTaskMember = require('./projectScopeTaskMember.model');
const ProjectScopeTaskAttachment = require('./projectScopeTaskAttachment.model');
const Task = require('./task.model');
const TaskChecklist = require('./taskChecklist.model');
const TaskUser = require('./taskUser.model');
const MeetingSchedule = require('./meetingSchedule.model');
const MeetingScheduleMember = require('./meetingScheduleMember.model');
const Permission = require('./permission.model');
const Role = require('./role.model');

// Define associations
Project.hasMany(ProjectScope, { foreignKey: 'project_id' });
ProjectScope.belongsTo(Project, { foreignKey: 'project_id' });

ProjectScope.hasMany(ProjectScopeTask, { foreignKey: 'project_scope_id' });
ProjectScopeTask.belongsTo(ProjectScope, { foreignKey: 'project_scope_id' });

Project.hasMany(ProjectScopeTask, { foreignKey: 'project_id' });
ProjectScopeTask.belongsTo(Project, { foreignKey: 'project_id' });

ProjectScopeTask.hasMany(ProjectScopeTaskMember, { foreignKey: 'project_scope_task_id' });
ProjectScopeTaskMember.belongsTo(ProjectScopeTask, { foreignKey: 'project_scope_task_id' });

User.hasMany(ProjectScopeTaskMember, { foreignKey: 'user_id' });
ProjectScopeTaskMember.belongsTo(User, { foreignKey: 'user_id' });

ProjectScopeTask.hasMany(ProjectScopeTaskAttachment, { foreignKey: 'project_scope_task_id' });
ProjectScopeTaskAttachment.belongsTo(ProjectScopeTask, { foreignKey: 'project_scope_task_id' });

Task.hasMany(TaskChecklist, { foreignKey: 'task_id' });
TaskChecklist.belongsTo(Task, { foreignKey: 'task_id' });

Task.hasMany(TaskUser, { foreignKey: 'task_id' });
TaskUser.belongsTo(Task, { foreignKey: 'task_id' });

User.hasMany(TaskUser, { foreignKey: 'user_id' });
TaskUser.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(MeetingSchedule, { foreignKey: 'project_id' });
MeetingSchedule.belongsTo(Project, { foreignKey: 'project_id' });

// Add many-to-many association between MeetingSchedule and User through MeetingScheduleMember
MeetingSchedule.belongsToMany(User, {
  through: MeetingScheduleMember,
  foreignKey: 'meeting_schedule_id',
  otherKey: 'user_id',
  as: 'members'
});
User.belongsToMany(MeetingSchedule, {
  through: MeetingScheduleMember,
  foreignKey: 'user_id',
  otherKey: 'meeting_schedule_id',
  as: 'meetings'
});

// Add these lines to the existing associations
User.hasMany(Project, { foreignKey: 'admin_id', as: 'adminProjects' });
Project.belongsTo(User, { foreignKey: 'admin_id', as: 'adminUser' });

User.hasMany(Project, { foreignKey: 'technician_id', as: 'technicianProjects' });
Project.belongsTo(User, { foreignKey: 'technician_id', as: 'technicianUser' });

// Make sure to export the Project model
module.exports = {
  User,
  Project,
  ProjectScope,
  ProjectScopeTask,
  ProjectScopeTaskMember,
  ProjectScopeTaskAttachment,
  Task,
  TaskChecklist,
  TaskUser,
  MeetingSchedule,
  MeetingScheduleMember,
  Permission,
  Role
};
