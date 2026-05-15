import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import User from '../models/User.js';

const router = express.Router();

// Initialize Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Store OTPs temporarily (In production use Redis)
const otpStore = {};

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send Phone OTP
router.post('/send-phone-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = generateOTP();
    otpStore[phone] = { otp, timestamp: Date.now() };

    await twilioClient.messages.create({
      body: `Your ENTERZILLA OTP is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.json({ success: true, message: 'OTP sent to phone' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Phone OTP & Login
router.post('/verify-phone-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!otpStore[phone] || otpStore[phone].otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Check if user exists, if not create
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({
        phone,
        username: `User_${Date.now()}`,
        isVerified: true,
      });
      await user.save();
    }

    delete otpStore[phone];

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key');

    res.json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Email Signup with OTP
router.post('/email-signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const otp = generateOTP();
    otpStore[email] = { otp, password, username, timestamp: Date.now() };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎬 ENTERZILLA - Verify Your Email',
      html: `
        <h2>Welcome to ENTERZILLA!</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Email Login
router.post('/email-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key');

    res.json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Email OTP during Signup
router.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email].otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const { password, username } = otpStore[email];

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
      isVerified: true,
    });

    await user.save();

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Welcome to ENTERZILLA!',
      html: `
        <h2>Account Created Successfully!</h2>
        <p>Welcome ${username}!</p>
        <p>Your account has been verified. Start watching your favorite movies now.</p>
        <p><strong>Enjoy streaming!</strong></p>
      `,
    });

    delete otpStore[email];

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key');

    res.json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
