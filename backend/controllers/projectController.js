const Project = require('../models/Project');

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/projects
// @desc    Create a project (Admin only conceptually for now)
// @access  Public (for seeding/testing, will lock later)
exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
