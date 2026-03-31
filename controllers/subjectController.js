const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;
    const subject = new Subject({ subjectName, userId: req.session.userId });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.session.userId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
