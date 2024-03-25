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

  // Returning a promise for sending the email
  return new Promise((resolve, reject) => {
    // Sending the email using the configured transporter
    transporter.sendMail(mailOptions, (error, info) => {
      // Handling errors
      if (error) {
        // Returning the error to the client
        reject(error);
      } else {
        // Resolving with the information about the sent email
        resolve(info);
      }
    });
  });
}

// Exporting the sendEmail function for use in other files
module.exports = sendEmail;