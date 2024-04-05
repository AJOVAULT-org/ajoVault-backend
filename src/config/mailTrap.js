// Importing nodemailer library for email functionality
const nodemailer = require("nodemailer");
require("dotenv").config();
// Creating a transporter object for Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
  // Hostname for Mailtrap SMTP server
  host: process.env.MAIL_CLIENT_HOST,
  // Port number for Mailtrap SMTP server
  port: process.env.MAIL_CLIENT_PORT,
  // Authentication credentials for Mailtrap
  auth: {
    // Mailtrap username
    user: process.env.MAIL_CLIENT_USERNAME,
    // Mailtrap password
    pass: process.env.MAIL_CLIENT_PASSWORD
  }
});

// Exporting the transporter object for use in other files
module.exports = transporter;