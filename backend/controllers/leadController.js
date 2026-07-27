const Lead = require('../models/Lead');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'fake-key' });

// @route   POST api/leads
// @desc    Create a new lead from contact form and score it via Gemini AI
// @access  Public
exports.createLead = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    let aiScore = null;

    // Use Gemini to score the lead if API key is provided
    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `
          You are an expert sales AI for a premium software agency.
          Evaluate the following incoming lead out of 100 based on their message and company.
          High intent signs: budget mentions, specific project details, timeline, enterprise company.
          Low intent signs: spam, generic "hello", wanting free work.
          
          Lead Name: ${name}
          Company: ${company || 'N/A'}
          Email: ${email}
          Message: ${message}
          
          Only return a single integer representing the score (0-100). Do not include any other text.
        `;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        const scoreStr = response.text().trim();
        const parsedScore = parseInt(scoreStr, 10);
        if (!isNaN(parsedScore)) {
          aiScore = parsedScore;
        }
      } catch (aiError) {
        console.error('AI Scoring Error:', aiError.message);
        // Continue without score if AI fails
      }
    }

    const newLead = new Lead({
      name,
      email,
      company,
      message,
      aiScore
    });

    const lead = await newLead.save();
    res.status(201).json({ msg: 'Message sent successfully', lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/leads
// @desc    Get all leads
// @access  Private (Admin)
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT api/leads/:id/status
// @desc    Update lead status
// @access  Private (Admin)
exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Ensure valid status
    const validStatuses = ['New', 'Contacted', 'Qualified', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE api/leads/:id
// @desc    Delete a lead
// @access  Private (Admin)
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
