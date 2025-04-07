// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Generate JWT Token
const generateToken = (userId: string, expiresIn = '1d') => {
  const jwtSecret = process.env.JWT_SECRET || 'default_secret_change_this';
  return jwt.sign({ userId }, jwtSecret, { expiresIn });
};

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate JWT
    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    // Get user ID from token
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'default_secret_change_this';
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      
      // Generate new token
      const newToken = generateToken(decoded.userId);
      
      res.json({ token: newToken });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    console.error('Token refresh error:', err);
    res.status(500).json({ message: 'Server error during token refresh' });
  }
};

// Logout (client-side action, but we can invalidate tokens in the future)
export const logout = async (req: Request, res: Response) => {
  // For now, just confirm logout success
  // In a more advanced implementation, we could add the token to a blacklist
  res.json({ message: 'Logout successful' });
};