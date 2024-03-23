// Importing the configured transporter object from the mailTrap.js
const transporter = require('./../config/mailTrap');

// Function to send an email using the configured transporter object
function sendEmail(to, subject, text) {
  // Creating mail options with recipient, subject, and text body
  const mailOptions = {
    // Sender email address
    from: '',
    // Recipient email address
    to: to,
    // Email subject
    subject: subject,
    // Email body text
    text: text
  };

  // Sending the email using the configured transporter
  transporter.sendMail(mailOptions, (error, info) => {
    // Handling errors, if any
    if (error) {
      console.log(error);
    } else {
      // Logging successful email response
      console.log('Email sent: ' + info.response);
    }
  });
}

// Exporting the sendEmail function for use in other files
module.exports = sendEmail;