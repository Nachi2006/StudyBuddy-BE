const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubtController");
const requireLogin = require("../middleware/auth");

router.post("/", requireLogin, doubtController.createDoubt);
router.get("/", requireLogin, doubtController.getDoubts);
router.get("/:id", requireLogin, doubtController.getDoubtById);
router.put("/:id", requireLogin, doubtController.updateDoubt);
router.delete("/:id", requireLogin, doubtController.deleteDoubt);
router.post("/:id/answers", requireLogin, doubtController.answerDoubt);

module.exports = router;
