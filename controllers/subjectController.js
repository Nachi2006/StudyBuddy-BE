const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;
    const subject = new Subject({ subjectName, userId: req.session.userId });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.session.userId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// In your Express backend

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
};
