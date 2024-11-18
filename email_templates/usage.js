const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "your-smtp-host",
  port: 587,
  secure: false,
  auth: {
    user: "your-email",
    pass: "your-password"
  }
});

// Email template functions - returns HTML string with variables replaced
const emailTemplates = {
  // OTP Email Template
  getOTPTemplate: (username, otpCode) => {
    return `
      <!DOCTYPE html>
      <html>
      <!-- Previous OTP template HTML -->
      `.replace('{{username}}', username)
        .replace('{{otpCode}}', otpCode);
  },

  // Password Reset Template
  getPasswordResetTemplate: (username, resetLink) => {
    return `
      <!DOCTYPE html>
      <html>
      <!-- Previous password reset template HTML -->
      `.replace('{{username}}', username)
        .replace('{{resetLink}}', resetLink);
  }
};

// Email sending functions
const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Example Express route for OTP verification
app.post('/api/send-otp', async (req, res) => {
  const { email, username, otpCode } = req.body;

  try {
    const mailOptions = {
      from: '"NeonCloud" <noreply@neoncloud.com>',
      to: email,
      subject: "Your Verification Code",
      html: emailTemplates.getOTPTemplate(username, otpCode)
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example Express route for password reset
app.post('/api/send-password-reset', async (req, res) => {
  const { email, username, resetToken } = req.body;
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    const mailOptions = {
      from: '"NeonCloud" <noreply@neoncloud.com>',
      to: email,
      subject: "Reset Your Password",
      html: emailTemplates.getPasswordResetTemplate(username, resetLink)
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example Express route for welcome email
app.post('/api/send-welcome', async (req, res) => {
  const { email, username } = req.body;
  const dashboardLink = `${process.env.FRONTEND_URL}/dashboard`;

  try {
    const mailOptions = {
      from: '"NeonCloud" <noreply@neoncloud.com>',
      to: email,
      subject: "Welcome to NeonCloud! 🚀",
      html: emailTemplates.getWelcomeTemplate(username, dashboardLink)
    };

    const result = await sendEmail(mailOptions);
    
    if (result.success) {
      res.status(200).json({ message: 'Welcome email sent successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
