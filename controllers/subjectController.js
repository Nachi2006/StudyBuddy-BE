const Subject = require("../models/Subject");
const Note = require("../models/Note");
const Assignment = require("../models/Assignment");

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
        if (!subject || subject.userId.toString() !== req.session.userId.toString()) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { subjectName },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    
    // Cascading deletes
    await Note.deleteMany({ subjectId: req.params.id });
    await Assignment.deleteMany({ subjectId: req.params.id });
    
    res.status(200).json({ message: "Subject and associated notes/assignments deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
