const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register route
router.post('/signup', authController.signup);

// Login route
router.post('/signin', authController.signin);

module.exports = router;