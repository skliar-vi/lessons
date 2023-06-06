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

const mail = {
    to: META_USER,
    from: META_USER,
    subject: 'Hello, world!',
    html: '<p>How r u?</p>'
}

transport.sendMail(mail)
    .then(() => console.log('Email sent success'))
    .catch((err) => console.log(err))