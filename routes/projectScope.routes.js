const express = require('express');
const router = express.Router();
const projectScopeController = require('../controllers/projectScope.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, projectScopeController.getAllScopes);
router.get('/:id', verifyToken, projectScopeController.getScopeById);
router.post('/', verifyToken, projectScopeController.createScope);
router.put('/:id', verifyToken, projectScopeController.updateScope);
router.delete('/:id', verifyToken, projectScopeController.deleteScope);

module.exports = router;