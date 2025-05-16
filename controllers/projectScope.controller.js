const { ProjectScope, ProjectScopeTask } = require('../models');

exports.getAllScopes = async (req, res) => {
  try {
    const scopes = await ProjectScope.findAll({
      include: [ProjectScopeTask]
    });
    res.status(200).json(scopes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScopeById = async (req, res) => {
  try {
    const scope = await ProjectScope.findByPk(req.params.id, {
      include: [ProjectScopeTask]
    });
    
    if (!scope) {
      return res.status(404).json({ message: 'Project scope not found' });
    }
    
    res.status(200).json(scope);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createScope = async (req, res) => {
  try {
    const scope = await ProjectScope.create(req.body);
    res.status(201).json({
      message: 'Project scope created successfully',
      scope
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateScope = async (req, res) => {
  try {
    const scope = await ProjectScope.findByPk(req.params.id);
    
    if (!scope) {
      return res.status(404).json({ message: 'Project scope not found' });
    }
    
    await scope.update(req.body);
    
    res.status(200).json({
      message: 'Project scope updated successfully',
      scope
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteScope = async (req, res) => {
  try {
    const scope = await ProjectScope.findByPk(req.params.id);
    
    if (!scope) {
      return res.status(404).json({ message: 'Project scope not found' });
    }
    
    await scope.destroy();
    
    res.status(200).json({ message: 'Project scope deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};