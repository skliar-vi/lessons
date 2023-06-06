const sendgrid = require('@sendgrid/mail')
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const mail = {
    to: "sajaha2121@onlcool.com",
    from: "vsklyar4@gmail.com",
    subject: "Hello, world!",
    html: "<h1>My first letter</h1>",
}

sendgrid.send(mail)
    .then(() => console.log('Letter sent'))
    .catch((err) => console.log(err.message))