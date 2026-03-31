const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const requireLogin = require("../middleware/auth");

router.post("/", requireLogin, subjectController.createSubject);
router.get("/", requireLogin, subjectController.getSubjects);

module.exports = router;
