const nodemailer = require('nodemailer');
require('dotenv').config()

const { META_PASSWORD, META_USER } = process.env;

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465, //25, 2525, 587
    secure: true,
    auth: {
        user: META_USER,
        pass: META_PASSWORD,
    }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const mail = { ...data, from: META_USER };
    await transport.sendMail(mail)
    return true;
}

module.exports = sendEmail

/*
const data = {
    to: 'smb@gmail.com',
    subject: 'Hello',
    html: '<p>Привіт</p>'
}

sendEmail(data)
*/