require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/sequelize');
const authRoutes = require('./routes/auth.routes');
const meetingScheduleRoutes = require('./routes/meetingSchedule.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Error handling middleware untuk task routes
const taskErrorHandler = (err, req, res, next) => {
  console.error('Task API Error:', err);
  res.status(500).json({ 
    message: 'Error pada task API', 
    error: err.message,
    path: req.path
  });
};

// Error handling middleware untuk project routes
const projectErrorHandler = (err, req, res, next) => {
  console.error('Project API Error:', err);
  res.status(500).json({ 
    message: 'Error pada project API', 
    error: err.message,
    path: req.path
  });
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/user.routes'));

// Project routes dengan error handler khusus
app.use('/api/projects', projectRoutes, projectErrorHandler);
app.use('/api/project-scopes', require('./routes/projectScope.routes'), projectErrorHandler);
app.use('/api/project-scope-tasks', require('./routes/projectScopeTask.routes'), projectErrorHandler);
app.use('/api/meeting-schedules', meetingScheduleRoutes);

// Task routes dengan error handler khusus
app.use('/api/tasks', taskRoutes, taskErrorHandler);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SiramsX API' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global API Error:', err);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server', 
    error: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
