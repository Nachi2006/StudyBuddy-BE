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

module.exports = {createDoubt,answerDoubt,getDoubts}