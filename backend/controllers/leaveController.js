const Leave = require("../models/Leave");
const LeaveBalance = require("../models/LeaveBalance");
const User = require("../models/User");

// =============================
// APPLY LEAVE
// =============================
const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, leaveType, reason } = req.body;

    const employee = await User.findById(req.user._id);

    if (!employee || employee.role !== "employee") {
      return res.status(400).json({ message: "Not an employee" });
    }

    if (!employee.manager) {
      return res
        .status(400)
        .json({ message: "Employee has no assigned manager" });
    }

    // 🚫 Prevent duplicate pending leave
    const existing = await Leave.findOne({
      user: req.user._id,
      fromDate,
      toDate,
      leaveType,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already applied for this leave",
      });
    }

    const leave = await Leave.create({
      user: req.user._id,
      manager: employee.manager,
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
      return res
        .status(400)
        .json({ message: "Cannot cancel approved/rejected leave" });
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
    const leaves = await Leave.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(leaves);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch leaves" });
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
    return res.status(500).json({ message: "Failed to fetch balance" });
  }
};

// =============================
// TEAM PENDING REQUESTS
// =============================
const getTeamPendingRequests = async (req, res) => {
  try {
    const pending = await Leave.find({
      manager: req.user._id,
      status: "pending",
    }).populate("user", "name email");

    return res.json(pending);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch pending requests" });
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
    return res.status(500).json({ message: "Failed to fetch history" });
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

// =============================
// APPROVE / REJECT LEAVE  ✅ FIXED
// =============================
const decideLeave = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const leaveId = req.params.id;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findOne({
      _id: leaveId,
      manager: req.user._id,
    });

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found or not assigned to this manager",
      });
    }

    // ⛔ Prevent double decision
    if (leave.status !== "pending") {
      return res.status(400).json({
        message: "Leave already processed",
      });
    }

    leave.status = status;
    leave.managerComment = comment || "";

    // ✅ DEDUCT BALANCE ONLY IF APPROVED
    if (status === "approved") {
      const balance = await LeaveBalance.findOne({ user: leave.user });

      if (!balance) {
        return res.status(404).json({ message: "Leave balance not found" });
      }

      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      const days =
        Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      if (leave.leaveType === "casual") {
        if (balance.casual < days) {
          return res.status(400).json({ message: "Insufficient casual leave" });
        }
        balance.casual -= days;
      }

      if (leave.leaveType === "sick") {
        if (balance.sick < days) {
          return res.status(400).json({ message: "Insufficient sick leave" });
        }
        balance.sick -= days;
      }

      if (leave.leaveType === "earned") {
        if (balance.earned < days) {
          return res.status(400).json({ message: "Insufficient earned leave" });
        }
        balance.earned -= days;
      }

      await balance.save();
    }

    await leave.save();

    return res.json({
      message: `Leave ${status} successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update leave" });
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
  decideLeave,
};
