require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/sequelize');
const authRoutes = require('./routes/auth.routes');
const meetingScheduleRoutes = require('./routes/meetingSchedule.routes');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Change from 3000 to 5000 to avoid conflict with Next.js

// Make sure you have only one cors middleware setup:
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Add this to allow credentials
}));

// Make sure body parser is configured
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/user.routes'));
// Add this line with the other route imports
const projectRoutes = require('./routes/project.routes');

// Add this line with the other app.use statements
app.use('/api/projects', projectRoutes);
app.use('/api/project-scopes', require('./routes/projectScope.routes'));
app.use('/api/project-scope-tasks', require('./routes/projectScopeTask.routes'));
app.use('/api/meeting-schedules', meetingScheduleRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SiramsX API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
