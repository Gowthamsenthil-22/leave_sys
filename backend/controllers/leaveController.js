const Leave = require("../models/Leave");
const LeaveBalance = require("../models/LeaveBalance");
const User = require("../models/User");

// =============================
// APPLY LEAVE
// =============================
const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, leaveType, reason } = req.body;

    // Load employee data (to get assigned manager)
    const employee = await User.findById(req.user._id);

    if (!employee || employee.role !== "employee") {
      return res.status(400).json({ message: "Not an employee" });
    }

    if (!employee.manager) {
      return res.status(400).json({ message: "Employee has no assigned manager" });
    }

    const leave = await Leave.create({
      user: req.user._id,
      manager: employee.manager,  // ⭐ Important for manager filtering
      fromDate,
      toDate,
      leaveType,
      reason,
      status: "pending",
    });

    return res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to apply leave" });
  }
};

// =============================
// CANCEL LEAVE
// =============================
const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) return res.status(404).json({ message: "Leave not found" });

    if (leave.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your leave" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel approved/rejected leave" });
    }

    await leave.deleteOne();

    return res.json({ message: "Leave cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel leave" });
  }
};

// =============================
// MY LEAVES
// =============================
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(leaves);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch my leaves" });
  }
};

// =============================
// MY BALANCE
// =============================
const getMyBalance = async (req, res) => {
  try {
    const balance = await LeaveBalance.findOne({ user: req.user._id });
    return res.json(balance);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch leave balance" });
  }
};

// =============================
// TEAM PENDING REQUESTS (⭐ FIXED)
// =============================
const getTeamPendingRequests = async (req, res) => {
  try {
    const managerId = req.user._id;

    const pending = await Leave.find({
      manager: managerId,
      status: "pending",
    }).populate("user", "name email");

    return res.json(pending);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch pending team requests" });
  }
};

// =============================
// TEAM HISTORY
// =============================
const getTeamHistory = async (req, res) => {
  try {
    const history = await Leave.find({
      manager: req.user._id,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json(history);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch team history" });
  }
};

// =============================
// TEAM CALENDAR
// =============================
const getTeamCalendar = async (req, res) => {
  try {
    const leaves = await Leave.find({
      manager: req.user._id,
      status: { $in: ["approved", "pending"] },
    }).populate("user", "name email");

    return res.json(leaves);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch calendar" });
  }
};

module.exports = {
  applyLeave,
  cancelLeave,
  getMyLeaves,
  getMyBalance,
  getTeamPendingRequests,
  getTeamHistory,
  getTeamCalendar,
};
