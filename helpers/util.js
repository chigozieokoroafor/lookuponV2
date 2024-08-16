const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const secret= process.env.AUTH_KEY

exports.backend_url = "https://lookuponv2.onrender.com/"

exports.generateToken = (payload, time, s) =>{
    const _secret = s ? s : secret
    return jwt.sign({ payload: payload }, _secret, { expiresIn: time })
}

exports.mailSend = (subject, to, html, attachments) => { //attachments should be an array
    try {
      const smtpTransport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PWD,
        }
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
