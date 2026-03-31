const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, default: "incomplete" },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
