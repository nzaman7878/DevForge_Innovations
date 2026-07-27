const Project = require('../models/Project');
const Post = require('../models/Post');
const Lead = require('../models/Lead');
const ClientProject = require('../models/ClientProject');

exports.getStats = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const projectCount = await Project.countDocuments();
    const postCount = await Post.countDocuments();
    const leadCount = await Lead.countDocuments();
    const clientProjectCount = await ClientProject.countDocuments();
    
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const conversionRate = leadCount > 0 ? ((convertedLeads / leadCount) * 100).toFixed(1) + '%' : '0%';

    res.json({
      stats: {
        projects: projectCount,
        posts: postCount,
        leads: leadCount,
        clientProjects: clientProjectCount,
        conversionRate,
      },
      recentLeads
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).send('Server error');
  }
};
