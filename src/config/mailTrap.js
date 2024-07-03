const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  // changed SMTP to use Gmail server instead
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS  
  }
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring transporter:", error);
  } else {
    console.log("Transporter configured successfully:", success);
  }
});

module.exports = transporter;