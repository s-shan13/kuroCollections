const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        form: process.env.EMAIL_USERNAME,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail;