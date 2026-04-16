const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const requireLogin = require("../middleware/auth");
const { getSubjectById } = require("../controllers/subjectController");

router.post("/", requireLogin, subjectController.createSubject);
router.get("/", requireLogin, subjectController.getSubjects);
router.get("/:id", requireLogin, getSubjectById);
router.put("/:id", requireLogin, subjectController.updateSubject);
router.delete("/:id", requireLogin, subjectController.deleteSubject);

module.exports = router;
