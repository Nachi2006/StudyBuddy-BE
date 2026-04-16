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

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.session.userId }).populate("subjectId");
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, fileLink, subjectId } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { title, fileLink, subjectId },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote }