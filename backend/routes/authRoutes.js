const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  getManagers,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

// NEW – LIST MANAGERS
router.get("/managers", getManagers);

module.exports = router;
