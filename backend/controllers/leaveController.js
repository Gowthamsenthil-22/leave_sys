const Leave = require("../models/Leave");
const LeaveBalance = require("../models/LeaveBalance");
const User = require("../models/User");

// =========================
// EMPLOYEE APPLY LEAVE
// =========================
const applyLeave = async (req, res, next) => {
  try {
    const { fromDate, toDate, leaveType, reason } = req.body;

    const employee = await User.findById(req.user._id);

    if (!employee.manager) {
      return res.status(400).json({
        message: "Employee is not assigned to any manager",
      });
    }

    const leave = await Leave.create({
      user: req.user._id,
      fromDate,
      toDate,
      leaveType,
      reason,
      manager: employee.manager, // IMPORTANT
    });

    return res.status(201).json(leave);
  } catch (err) {
    next(err);
  }
};

// =========================
// EMPLOYEE VIEW OWN LEAVES
// =========================
const getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(leaves);
};

// =========================
// EMPLOYEE BALANCE
// =========================
const getMyBalance = async (req, res) => {
  const balance = await LeaveBalance.findOne({ user: req.user._id });
  res.json(balance);
};

// =========================
// MANAGER – GET PENDING LEAVES OF HIS TEAM
// =========================
const getPendingLeaves = async (req, res) => {
  const leaves = await Leave.find({
    manager: req.user._id,
    status: "pending",
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(leaves);
};

// =========================
// MANAGER – DECIDE LEAVE
// =========================
const decideLeave = async (req, res) => {
  const { status, managerComment } = req.body;

  const leave = await Leave.findById(req.params.id);

  if (!leave) return res.status(404).json({ message: "Leave not found" });

  if (leave.manager.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not your team member" });
  }

  leave.status = status;
  leave.managerComment = managerComment;
  await leave.save();

  // Deduct balance if approved
  if (status === "approved") {
    const bal = await LeaveBalance.findOne({ user: leave.user });
    bal[leave.leaveType] -= 1;
    await bal.save();
  }

  res.json(leave);
};

// =========================
// MANAGER – TEAM HISTORY
// =========================
const getTeamHistory = async (req, res) => {
  const leaves = await Leave.find({ manager: req.user._id })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(leaves);
};

// =========================
// MANAGER – CALENDAR
// =========================
const getTeamCalendar = async (req, res) => {
  const { from, to } = req.query;

  const filters = { manager: req.user._id };

  if (from) filters.fromDate = { $gte: new Date(from) };
  if (to) filters.toDate = { $lte: new Date(to) };

  const leaves = await Leave.find(filters).populate("user", "name email");

  res.json(leaves);
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getMyBalance,
  getPendingLeaves,
  decideLeave,
  getTeamHistory,
  getTeamCalendar,
};
