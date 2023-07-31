const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

async function sendEmail({ to, from, subject, html }) {
  const email = {
    to,
    from,
    subject,
    html,
  };

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const response = await transport.sendMail(email);
}

module.exports = sendEmail;
