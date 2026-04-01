const Subject = require("../models/Subject");
const Note = require("../models/Note");
const Assignment = require("../models/Assignment");

const getDashboard = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.session.userId });
    const notes = await Note.find({ userId: req.session.userId });
    const subjectIds = subjects.map(s => s._id);
    const assignments = await Assignment.find({ subjectId: { $in: subjectIds } });
    res.status(200).json({ subjects, notes, assignments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDashboard;