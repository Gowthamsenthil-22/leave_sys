const express = require("express");
const router = express.Router();
const {
  applyLeave,
  cancelLeave,
  getMyLeaves,
  getMyBalance,
  getTeamPendingRequests,
  getTeamHistory,
  getTeamCalendar,
  decideLeave,
} = require("../controllers/leaveController");

const { protect, managerOnly } = require("../middleware/authMiddleware");

// EMPLOYEE ROUTES
router.post("/apply", protect, applyLeave);
router.put("/:id/cancel", protect, cancelLeave);
router.get("/my", protect, getMyLeaves);
router.get("/balance", protect, getMyBalance);

// MANAGER ROUTES
router.get("/pending/team", protect, managerOnly, getTeamPendingRequests);
router.get("/team/history", protect, managerOnly, getTeamHistory);
router.get("/team/calendar", protect, managerOnly, getTeamCalendar);

// ⭐ APPROVE / REJECT LEAVE
router.put("/:id/decision", protect, managerOnly, decideLeave);

module.exports = router;
