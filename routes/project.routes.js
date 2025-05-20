const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const taskController = require('../controllers/task.controller');

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Create a new project
router.post('/', projectController.createProject);

// Update a project
router.put('/:id', projectController.updateProject);

// Delete a project
router.delete('/:id', projectController.deleteProject);

// Update project progress
router.patch('/:id/progress', projectController.updateProgress);

// Pisahkan endpoint task dengan try-catch untuk menangani error
router.get('/:projectId/tasks', async (req, res, next) => {
  try {
    // Panggil controller task dengan try-catch
    await taskController.getTasksByProjectId(req, res, next);
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
    // Kirim respons error tanpa mempengaruhi endpoint project lainnya
    res.status(500).json({
      message: 'Gagal mengambil task untuk project ini',
      error: error.message,
      projectId: req.params.projectId
    });
  }
});

module.exports = router;