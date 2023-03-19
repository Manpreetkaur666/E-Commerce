const nodemailer = require('nodemailer')
require('dotenv').config({path: 'backend/config/config.env'})

const sendEmail = async ( options )=> {

    // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
   })

   const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
   }

   await transporter.sendMail(mailOptions);
}

module.exports = sendEmail