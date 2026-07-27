const ClientProject = require('../models/ClientProject');
const User = require('../models/User');

// @route   GET api/client-projects/mine
// @desc    Get logged-in client's projects
// @access  Private (Client)
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await ClientProject.find({ client: req.user.id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/client-projects
// @desc    Get all client projects (for admin)
// @access  Private (Admin)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ClientProject.find().populate('client', 'name email').sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/client-projects
// @desc    Create a new client project
// @access  Private (Admin)
exports.createProject = async (req, res) => {
  try {
    const newProject = new ClientProject(req.body);
    const project = await newProject.save();
    const populated = await project.populate('client', 'name email');
    res.json(populated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT api/client-projects/:id
// @desc    Update a client project
// @access  Private (Admin)
exports.updateProject = async (req, res) => {
  try {
    const project = await ClientProject.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('client', 'name email');
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE api/client-projects/:id
// @desc    Delete a client project
// @access  Private (Admin)
exports.deleteProject = async (req, res) => {
  try {
    const project = await ClientProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/client-projects/clients
// @desc    Get a list of all client users to assign projects to
// @access  Private (Admin)
exports.getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('name email');
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
