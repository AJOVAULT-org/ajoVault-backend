// Importing nodemailer library for email functionality
const nodemailer = require('nodemailer');

// Creating a transporter object for Mailtrap SMTP settings
const transporter = nodemailer.createTransport({
  // Hostname for Mailtrap SMTP server
  host: 'smtp.mailtrap.io',
  // Port number for Mailtrap SMTP server
  port: 2525,
  // Authentication credentials for Mailtrap
  auth: {
    // Mailtrap username
    user: 'ebe083c3ec1836',
    // Mailtrap password
    pass: 'd88ebd32b57aa7'
  }
});

// Exporting the transporter object for use in other files
module.exports = transporter;