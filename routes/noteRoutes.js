const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const requireLogin = require("../middleware/auth");

router.post("/", requireLogin, noteController.createNote);
router.get("/", requireLogin, noteController.getNotes);
router.get("/:id", requireLogin, noteController.getNoteById);
router.put("/:id", requireLogin, noteController.updateNote);
router.delete("/:id", requireLogin, noteController.deleteNote);

module.exports = router;
