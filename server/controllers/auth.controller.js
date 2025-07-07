import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../error.js';
import { validateRegister, validateLogin } from '../validations/auth.validation.js';

// Generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Register
export const register = async (req, res, next) => {
  try {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) return next(createError(400, { errors }));

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createError(400, 'User already exists'));

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const { password: _, ...userWithoutPassword } = user._doc;

    const tokens = generateTokens(user);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(201).json({
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return next(createError(400, { errors }));

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, 'User not found'));

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(createError(400, 'Invalid password'));

    const tokens = generateTokens(user);
    const { password: _, ...userWithoutPassword } = user._doc;

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(200).json({
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

// Refresh token
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(createError(401, 'Refresh token required'));

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(createError(404, 'User not found'));

    const tokens = generateTokens(user);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid refresh token'));
    }
    next(err);
  }
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Logged out successfully');
};