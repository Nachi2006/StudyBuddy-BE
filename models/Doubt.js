const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Doubt", doubtSchema);
