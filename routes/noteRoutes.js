const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const requireLogin = require("../middleware/auth");

router.post("/", requireLogin, noteController.createNote);
router.get("/", requireLogin, noteController.getNotes);

module.exports = router;
