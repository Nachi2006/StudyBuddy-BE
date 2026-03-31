const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const requireLogin = require("../middleware/auth");

router.post("/", requireLogin, assignmentController.createAssignment);
router.get("/", requireLogin, assignmentController.getAssignments);
router.put("/:id", requireLogin, assignmentController.updateAssignment);
router.delete("/:id", requireLogin, assignmentController.deleteAssignment);

module.exports = router;
