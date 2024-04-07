// Importing the configured transporter object from the mailTrap.js
const transporter = require("../mailTrap");

// Function to send an email using the configured transporter object
function sendEmail(toName, toEmail, subject, text) {
  // Creating mail options with correct recipient format, subject, and text body 
  const mailOptions = {
    // Sender email address
    from: "",
    // Recipient email address
    to: `${toName} <${toEmail}>`,
    // Email subject
    subject,
    // Email body text
    text
  };

  // Return a promise for sending the email
  return new Promise((resolve, reject) => {
    // Send the email using the transporter 
    transporter.sendMail(mailOptions, (error, info) => {
      // Check if there's an error
      if (error) {
        // Reject the promise with the error
        reject(new Error("Error sending email: " + error.message));
      } else {
        // Resolve the promise with the messageID
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