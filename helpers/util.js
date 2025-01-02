const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const secret = process.env.AUTH_KEY

exports.backend_url = "https://lookuponv2.onrender.com/"

exports.generateToken = (payload, time, s) => {
  const _secret = s ? s : secret
  return jwt.sign({ payload: payload }, _secret, { expiresIn: time })
}

exports.mailSend = (subject, to, html, attachments) => { //attachments should be an array
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      // debug:true,
      // logger:true,
      auth: {
        type: "LOGIN",
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD,
      },
      // connectionTimeout: 10000, // increase timeout
      // greetingTimeout: 10000
    });

    const mailOptions = {
      from: `"Lookupon" <${process.env.MAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html,  // html body
    };
    if (attachments) {
      mailOptions.attachments = attachments;
    }

    smtpTransport.sendMail(mailOptions);
  } catch (err) {
    console.log('sendEmail', err.message);
  }
}

exports.destructureToken = (token, s) => {
  const _secret = s ? s : secret

  try {
    return jwt.verify(token, _secret)?.payload;
  } catch (error) {
    return false

    //   if (error.name === "TokenExpiredError") {
    //     err = "Session Expired.";
    //     err_status = 403;
    //     return false
    // } else if (error.name === "JsonWebTokenError") {
    //     err = "Invalid Token";
    //     err_status = 498;
    //     return false
    // }

  }
};

exports.reVerificationTag = () => {
  const randomBytes = crypto.randomBytes(15); // 15 bytes = 30 hex characters
  return randomBytes.toString('hex').slice(0, 20);
}

exports.createRegex = txt =>{
  txt  = txt.replace(" ", "\\s*")
  const escapedInput = txt.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

  // Build a regex pattern that matches the entire word or parts of it, case-insensitively
  // return new RegExp(`\\b${escapedInput}\\b|${escapedInput}`, 'i');
  return `\\b${escapedInput}\\b|${escapedInput}`
  // return 
}