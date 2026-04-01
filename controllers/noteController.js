const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    const { title, fileLink, subjectId } = req.body;
    const note = new Note({ title, fileLink, subjectId, userId: req.session.userId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.session.userId }).populate("subjectId");
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {createNote,getNotes}