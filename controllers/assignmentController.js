const Assignment = require("../models/Assignment");

const createAssignment = async (req, res) => {
  try {
    const { title, deadline, subjectId } = req.body;
    const assignment = new Assignment({ title, deadline, subjectId });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate({
      path: "subjectId",
      match: { userId: req.session.userId }
    });
    const userAssignments = assignments.filter(a => a.subjectId !== null);
    res.status(200).json(userAssignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { title, deadline, status } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { title, deadline, status },
      { new: true }
    );
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {createAssignment,getAssignments,updateAssignment,deleteAssignment}