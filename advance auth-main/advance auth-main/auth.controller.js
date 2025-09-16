
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { isNonEmptyString, isMobile, isStrongPassword } = require("../validators");

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

async function register(req, res, next) {
  try {
    const { name, mobile, password } = req.body;

    if (!isNonEmptyString(name, 2)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Name is required (min 2 chars)" });
    }
    if (!isMobile(mobile)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Valid mobile (10-15 digits) is required" });
    }
    if (!isStrongPassword(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ mobile });
    if (exists) {
      return res.status(StatusCodes.CONFLICT).json({ message: "Mobile already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, mobile, passwordHash });

    const token = signToken({ id: user._id, mobile: user.mobile, role: user.role });
    return res.status(StatusCodes.CREATED).json({
      user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { mobile, password } = req.body;

    if (!isMobile(mobile) || !isStrongPassword(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ mobile }).select("+passwordHash");
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: user._id, mobile: user.mobile, role: user.role });
    return res.status(StatusCodes.OK).json({
      user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    return res.json({ user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role } });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
