const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const projectRoutes = require('./project.routes');
const taskRoutes = require('./task.routes');
const authRoutes = require('./auth.routes');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth');

// Auth routes (tidak perlu auth middleware)
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

// Route khusus untuk mendapatkan task berdasarkan project ID
router.get('/projects/:projectId/tasks', authMiddleware, taskController.getTasksByProjectId);

module.exports = router;