const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const requireLogin = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", requireLogin, authController.logout);

module.exports = router;
