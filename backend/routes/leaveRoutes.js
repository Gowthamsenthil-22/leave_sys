const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getMyBalance,
  getPendingLeaves,
  decideLeave,
  getTeamHistory,
  getTeamCalendar
} = require("../controllers/leaveController");

const { protect, managerOnly } = require("../middleware/authMiddleware");

// EMPLOYEE ROUTES
router.post("/apply", protect, applyLeave);
router.get("/my", protect, getMyLeaves);
router.get("/balance", protect, getMyBalance);

// MANAGER ROUTES
router.get("/team/pending", protect, managerOnly, getPendingLeaves);
router.get("/team/history", protect, managerOnly, getTeamHistory);
router.get("/team/calendar", protect, managerOnly, getTeamCalendar);

router.put("/:id/decision", protect, managerOnly, decideLeave);

module.exports = router;
