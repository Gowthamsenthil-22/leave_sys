const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const LeaveBalance = require("../models/LeaveBalance");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// =========================
// GET ALL MANAGERS
// =========================
const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("name email");
    return res.json(managers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load managers" });
  }
};

// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, manager } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUserData = {
      name,
      email,
      password: hashed,
      role: role || "employee",
    };

    // If employee, assign manager
    if (role === "employee") {
      newUserData.manager = manager;
    }

    const user = await User.create(newUserData);

    // Create employee leave balance
    if (user.role === "employee") {
      await LeaveBalance.create({
        user: user._id,
        casual: 12,
        sick: 10,
        earned: 15,
      });
    }

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// =========================
// LOGIN
// =========================
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// =========================
// CURRENT USER
// =========================
const getMe = async (req, res) => {
  return res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getManagers,
};
