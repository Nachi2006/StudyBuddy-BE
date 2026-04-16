const Assignment = require("../models/Assignment");
const Subject = require("../models/Subject");

const createAssignment = async (req, res) => {
  try {
    const { title, deadline, subjectId } = req.body;
    // Verify the subject belongs to the logged-in user
    const subject = await Subject.findOne({ _id: subjectId, userId: req.session.userId });
    if (!subject) return res.status(403).json({ error: "Subject not found or unauthorized" });
    const assignment = new Assignment({ title, deadline, subjectId });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    // Get all subjects owned by the user, then fetch their assignments
    const subjects = await Subject.find({ userId: req.session.userId }).select("_id");
    const subjectIds = subjects.map(s => s._id);
    const assignments = await Assignment.find({ subjectId: { $in: subjectIds } }).populate("subjectId");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate("subjectId");
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    // Verify ownership via the subject's userId
    if (assignment.subjectId.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { title, deadline, status, subjectId } = req.body;
    // Fetch and verify ownership before updating
    const existing = await Assignment.findById(req.params.id).populate("subjectId");
    if (!existing) return res.status(404).json({ error: "Assignment not found" });
    if (existing.subjectId.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    // If a new subjectId is provided, verify it belongs to the user too
    if (subjectId && subjectId !== existing.subjectId._id.toString()) {
      const newSubject = await Subject.findOne({ _id: subjectId, userId: req.session.userId });
      if (!newSubject) return res.status(403).json({ error: "New subject not found or unauthorized" });
    }
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (deadline !== undefined) updateFields.deadline = deadline;
    if (status !== undefined) updateFields.status = status;
    if (subjectId !== undefined) updateFields.subjectId = subjectId;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).populate("subjectId");
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    // Fetch and verify ownership before deleting
    const existing = await Assignment.findById(req.params.id).populate("subjectId");
    if (!existing) return res.status(404).json({ error: "Assignment not found" });
    if (existing.subjectId.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment };