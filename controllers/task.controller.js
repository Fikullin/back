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

    const { project_id, scope, due_date } = req.body;

    // Validate project_id presence
    if (!project_id) {
      return res.status(400).json({ message: 'project_id is required' });
    }

    // Check if project exists
    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(400).json({ message: `Project with id ${project_id} does not exist` });
    }

    // Validate scope enum
    const allowedScopes = ['project', 'task', 'invoice', 'activity', 'member'];
    if (scope && !allowedScopes.includes(scope)) {
      return res.status(400).json({ message: `Invalid scope value. Allowed values are: ${allowedScopes.join(', ')}` });
    }

    // Parse due_date string to Date object if present and not null
    let parsedDueDate = null;
    if (due_date && typeof due_date === 'string') {
      parsedDueDate = new Date(due_date);
      if (isNaN(parsedDueDate)) {
        return res.status(400).json({ message: 'Invalid due_date format' });
      }
    }

    // Sanitasi data sebelum membuat task
    const taskData = {
      ...req.body,
      due_date: parsedDueDate,
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
    console.log(`UpdateTask called with data:`, req.body);
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const allowedScopes = ['project', 'task', 'invoice', 'activity', 'member'];
    const allowedStatuses = ['not_started', 'in_progress', 'completed', 'blocked'];

    const { due_date, scope, status } = req.body;
    let parsedDueDate = null;
    if (due_date && typeof due_date === 'string') {
      parsedDueDate = new Date(due_date);
      if (isNaN(parsedDueDate)) {
        return res.status(400).json({ message: 'Invalid due_date format' });
      }
    }

    if (scope && !allowedScopes.includes(scope)) {
      console.error(`Invalid scope value received: ${scope}. Allowed values: ${allowedScopes.join(', ')}`);
      return res.status(400).json({ message: `Invalid scope value: ${scope}. Allowed values are: ${allowedScopes.join(', ')}` });
    }

    if (status && !allowedStatuses.includes(status)) {
      console.error(`Invalid status value received: ${status}. Allowed values: ${allowedStatuses.join(', ')}`);
      return res.status(400).json({ message: `Invalid status value: ${status}. Allowed values are: ${allowedStatuses.join(', ')}` });
    }

    // Filter updateData to only include fields present in req.body
    const updateData = {};
    const updatableFields = ['title', 'action', 'description', 'status', 'priority', 'due_date', 'assigned_to', 'attachment', 'scope', 'status_description', 'completed'];

    updatableFields.forEach(field => {
      if (field === 'due_date') {
        updateData[field] = parsedDueDate;
      } else if (req.body.hasOwnProperty(field)) {
        updateData[field] = req.body[field];
      }
    });

    await task.update(updateData);
    
    const updatedTask = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'name', 'email'] },
        { model: Project, attributes: ['id', 'name'] }
      ]
    });
    console.log(`Updated task:`, updatedTask);
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
