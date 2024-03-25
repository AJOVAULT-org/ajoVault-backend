// Importing the configured transporter object from the mailTrap.js
const transporter = require('./mailTrap');

// Function to send an email using the configured transporter object
function sendEmail(toName, toEmail, subject, text) {
  // Creating mail options with correct recipient format, subject, and text body 
  const mailOptions = {
    // Sender email address
    from: '',
    // Recipient email address
    to: `${toName} <${toEmail}>`,
    // Email subject
    subject: subject,
    // Email body text
    text: text
  };

  // send the email using the transporter 
  transporter.sendMail(mailOptions, (error, info) => {
    // return errors, if any
    if (error) {
      return error;
    }
  });
}

// Exporting the sendEmail function for use in other files
module.exports = sendEmail;