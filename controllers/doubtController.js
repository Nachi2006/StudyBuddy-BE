const Doubt = require("../models/Doubt");

const createDoubt = async (req, res) => {
  try {
    const { question } = req.body;
    const doubt = new Doubt({ question, userId: req.session.userId });
    await doubt.save();
    res.status(201).json(doubt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const answerDoubt = async (req, res) => {
  try {
    const { answer } = req.body;
    const doubt = await Doubt.findById(req.params.id);
    doubt.answers.push(answer);
    await doubt.save();
    res.status(200).json(doubt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.status(200).json(doubts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoubtById = async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) return res.status(404).json({ error: "Doubt not found" });
    res.status(200).json(doubt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDoubt = async (req, res) => {
  try {
    const { question } = req.body;
    const doubt = await Doubt.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { question },
      { new: true }
    );
    if (!doubt) return res.status(404).json({ error: "Doubt not found or unauthorized" });
    res.status(200).json(doubt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    if (!doubt) return res.status(404).json({ error: "Doubt not found or unauthorized" });
    res.status(200).json({ message: "Doubt deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createDoubt, answerDoubt, getDoubts, getDoubtById, updateDoubt, deleteDoubt };