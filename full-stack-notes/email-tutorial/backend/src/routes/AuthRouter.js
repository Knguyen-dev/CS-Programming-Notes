const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

// Realistically though in your authController you could do '/verify/:token'
router.get("/verify-email/:token", authController.verifyEmail);

module.exports = router;
