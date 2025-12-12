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
// REGISTER USER (FIXED)
// =========================
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, manager } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // email exists?
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // build new user
    const newUserData = {
      name,
      email,
      password: hashed,
      role: role || "employee",
    };

    // If employee → assign manager
    if (role === "employee") {
      newUserData.manager = manager;
    }

    // create user
    const user = await User.create(newUserData);

    // Create Leave Balance for employees
    if (user.role === "employee") {
      await LeaveBalance.create({
        user: user._id,
        casual: 12,
        sick: 10,
        earned: 15,
      });
    }

    // ⭐ FIXED: return user + token (frontend expects this structure)
    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });

  } catch (err) {
    next(err);
  }
};

// =========================
// LOGIN USER
// =========================
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });

  } catch (err) {
    next(err);
  }
};

// =========================
// GET CURRENT USER
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
