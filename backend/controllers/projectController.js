const Project = require('../models/Project');
const imagekit = require('../config/imagekit');

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

exports.createProject = async (req, res) => {
  try {
    let imageUrl = '';
    
    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `project_${Date.now()}`,
        folder: '/devforge/projects'
      });
      imageUrl = uploadResponse.url;
    }

    // Since technologies is sent as a string when using FormData (or array if JSON), handle it:
    let technologies = req.body.technologies;
    if (typeof technologies === 'string') {
      technologies = technologies.split(',').map(t => t.trim()).filter(t => t);
    }

    const newProject = new Project({
      ...req.body,
      technologies,
      imageUrl: imageUrl || req.body.imageUrl // fallback if someone still sends string
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProject = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `project_${Date.now()}`,
        folder: '/devforge/projects'
      });
      imageUrl = uploadResponse.url;
    }

    let technologies = req.body.technologies;
    if (typeof technologies === 'string') {
      technologies = technologies.split(',').map(t => t.trim()).filter(t => t);
    }

    const updateData = {
      ...req.body,
      technologies
    };
    
    // Only update imageUrl if we got a new file or an explicitly passed string
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    } else {
      // If no file and no string, do not overwrite existing imageUrl with undefined
      delete updateData.imageUrl;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Error updating project:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
