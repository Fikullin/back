const { Task, User, Project } = require('../models');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] },
        { model: Project, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] },
        { model: Project, attributes: ['id', 'name'] }
      ]
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error(`Error fetching task with ID ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTasksByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    console.log(`Fetching tasks for project ID: ${projectId}`);
    
    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      console.log(`Project with ID ${projectId} not found`);
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const tasks = await Task.findAll({
      where: { project_id: projectId },
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] },
        { model: Project, attributes: ['id', 'name'] }
      ]
    });
    
    console.log(`Found ${tasks.length} tasks for project ID ${projectId}`);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(`Error fetching tasks for project ID ${req.params.projectId}:`, error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    console.log('Creating task with data:', req.body);
    
    // Sanitasi data sebelum membuat task
    const taskData = {
      ...req.body,
      // Konversi string kosong menjadi null untuk assigned_to
      assigned_to: req.body.assigned_to === '' ? null : req.body.assigned_to
    };
    
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.update(req.body);
    
    const updatedTask = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] },
        { model: Project, attributes: ['id', 'name'] }
      ]
    });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Error updating task with ID ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.destroy();
    
    // Return 204 No Content to avoid frontend parsing issues
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting task with ID ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
};
