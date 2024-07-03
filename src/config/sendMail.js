const transporter = require('./mailTrap');
require("dotenv").config();

// Function to send an email using the configured transporter object
function sendEmail(toName, toEmail, subject, text) {
  const mailOptions = {
    // Recipient email address
    from: process.env.GMAIL_USER,
    to: `${toName} <${toEmail}>`,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new Error('Error sending email: ' + error.message));
      } else {
        const successMessage = `Email sent successfully. Message ID: ${info.messageId}`;
        resolve(successMessage);
      }
    });
  });
}

module.exports = sendEmail;