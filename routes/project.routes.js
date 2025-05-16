const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

// Get all projects
// Add this mock endpoint at the top of your routes
router.get('/', (req, res) => {
  // Mock data for testing
  const mockProjects = [
    {
      id: 1,
      name: 'Test Project 1',
      admin: 'Admin User',
      technician: 'Tech User',
      progress: 25,
      state: 'Ongoing',
      start_date: '2023-01-01',
      end_date: '2023-12-31'
    },
    {
      id: 2,
      name: 'Test Project 2',
      admin: 'Admin User',
      technician: 'Tech User',
      progress: 75,
      state: 'Completed',
      start_date: '2023-02-01',
      end_date: '2023-11-30'
    }
  ];
  
  res.status(200).json(mockProjects);
});
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

module.exports = router;