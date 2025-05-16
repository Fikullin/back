const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@sirams.com' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@sirams.com',
      password: 'password', // Will be hashed by the model hook
      role: 'admin',
      email_verified_at: new Date()
    });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit();
  }
}

createAdmin();