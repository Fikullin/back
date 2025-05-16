const express = require('express');
const router = express.Router();
const projectScopeTaskController = require('../controllers/projectScopeTask.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, projectScopeTaskController.getAllTasks);
router.get('/:id', verifyToken, projectScopeTaskController.getTaskById);
router.post('/', verifyToken, projectScopeTaskController.createTask);
router.put('/:id', verifyToken, projectScopeTaskController.updateTask);
router.delete('/:id', verifyToken, projectScopeTaskController.deleteTask);

module.exports = router;