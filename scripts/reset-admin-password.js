const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function resetAdminPassword() {
  try {
    // Find admin user
    const admin = await User.findOne({ where: { email: 'admin@sirams.com' } });
    
    if (!admin) {
      console.log('Admin user not found');
      return;
    }
    
 
    const newPassword = 'admin';
    admin.password = bcrypt.hashSync(newPassword, 10);
    await admin.save();
    
    console.log('Admin password reset successfully to:', newPassword);
    console.log('Email:', admin.email);
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    process.exit();
  }
}

resetAdminPassword();