import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';
import User from '../models/User.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/google', async (req, res) => {
  const { name, email, img } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      user = await User.create({ 
        name, 
        email, 
        img, 
        password: await bcrypt.hash(randomPassword, 10)
      });
    }

    // Generate JWT token like in normal login
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(200).json({
      user: userWithoutPassword,
      accessToken
    });
  } catch (err) {
    res.status(500).json({ message: "Google sign-in failed", error: err.message });
  }
});

export default router;