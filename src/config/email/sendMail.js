const transporter = require("../mailTrap");
require("dotenv").config();

// Function to send an email using the configured transporter object
function sendEmail(toName, toEmail, subject, text) {
    const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${toName} <${toEmail}>`,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new Error("Error sending email: " + error.message));
      } else {
        const successMessage = `Email sent successfully. Message ID: ${info.messageId}`;
        resolve(successMessage);
      }
    });
  });
}

const verificationEmail = async (otp, recipientName, recipientEmail) => {
  const emailBody = `Here is your confirmation OTP ${otp}`;
  const subject = "Your verification email";

  try {
    await sendEmail(recipientName, recipientEmail, subject, emailBody);
  } catch (e) {
    throw new Error(e);
  }
};

// Exporting the sendEmail function for use in other files
module.exports = {
  verificationEmail
};
