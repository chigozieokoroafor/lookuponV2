// contains auth
// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('../db/model');
const { generateAccessToken, destructureToken, createRedirectUrl, mailSend } = require('../helpers/util');
const router = express.Router();

// Create Account
router.post('/create-account', async (req, res) => {
  const { email, password, first_name, last_name, firebase_auth } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ msg: 'Required fields missing or empty' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ msg: 'Account with email exists' });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    await Profile.create({
      user_id: user.id,
      firebase_auth,
    });

    const verificationUri = createRedirectUrl(req, { id: user.id }, 'email_verification', 'verify');
    const emailTemp = `<p>Click <a href="${verificationUri}">here</a> to verify your email.</p>`; // Adjust the email template as needed
    const mailSent = await mailSend(email, emailTemp, 'Test Verification');

    if (!mailSent) {
      return res.status(400).json({ msg: 'Error occurred while sending mail' });
    }

    res.status(201).json({ msg: 'Account Created, kindly check mail provided for verification link.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Error occurred while creating account' });
  }
});

// Sign In
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(406).json({ msg: 'Email and password fields required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Account with credentials provided doesn't exist" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    const token = generateAccessToken({ id: user.id });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error occurred while signing in' });
  }
});

// Send Verification Email
router.get('/send-verification', (req, res) => {
  res.send('<p>Verification email template</p>'); // Adjust the email template as needed
});

// Verify Email
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  const data = destructureToken(token, 'email_verification');
  if (!data) {
    return res.status(410).json({ msg: 'Verification Link expired, Kindly request for another to verify account' });
  }

  try {
    const user = await User.findByPk(data.id);
    if (!user) {
      return res.status(404).json({ msg: "Account with credentials provided doesn't exist" });
    }

    user.account_verified = true;
    await user.save();

    res.send('<p>Welcome! Your account has been verified.</p>'); // Adjust the welcome template as needed
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error occurred while verifying account' });
  }
});

// Send Password Reset Email
router.post('/send-password-reset-mail', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: 'Account with email not found' });
    }

    const token = generateAccessToken({ email }, 'password_reset');
    const PWD_RESET_URL = `${process.env.PWD_RESET_URL}?token=${token}`;
    const emailTemp = `<p>Click <a href="${PWD_RESET_URL}">here</a> to reset your password.</p>`; // Adjust the email template as needed
    const mailSent = await mailSend(email, emailTemp, 'Password Reset Request');

    if (!mailSent) {
      return res.status(400).json({ msg: 'Error occurred while sending mail' });
    }

    res.status(200).json({ msg: 'Password reset mail sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error occurred while sending password reset mail' });
  }
});

// Update Password
router.post('/update-password', async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  const data = destructureToken(token, 'password_reset');
  if (!data) {
    return res.status(410).json({ msg: 'Token expired' });
  }

  if (!password) {
    return res.status(412).json({ msg: 'New password required' });
  }

  try {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(404).json({ msg: "Account with credentials provided doesn't exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error occurred while updating password' });
  }
});

module.exports = router;
