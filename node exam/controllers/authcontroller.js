import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "mysecret",
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password required' });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: 'Username already taken' });

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);

    res.cookie(process.env.COOKIE_NAME || 'token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out' });
};
