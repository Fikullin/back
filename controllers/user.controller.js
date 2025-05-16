const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      created_at: user.created_at,
      updated_at: user.updated_at
    }));
    
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Format the response to include role
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    
    res.status(200).json(formattedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, password_confirmation, role, phone } = req.body;
    
    // Validate password confirmation
    if (password !== password_confirmation) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password, 
      role: role || 'user',
      email_verified_at: new Date()
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { name, email, password, password_confirmation, role, phone } = req.body;
    
    // Check if email is being updated and if it's already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    // Validate password confirmation if password is being updated
    if (password) {
      if (password !== password_confirmation) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
    }
    
    // Update user data - ensure role is explicitly set from request or keep existing
    const updateData = {
      name: name || user.name,
      email: email || user.email,
      role: role !== undefined ? role : user.role,
    };
    
    // Only update password if provided
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }
    
    // Log the update data for debugging
    console.log('Updating user with data:', updateData);
    
    await user.update(updateData);
    
    // Fetch the updated user to confirm changes
    const updatedUser = await User.findByPk(req.params.id);
    
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.destroy();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};