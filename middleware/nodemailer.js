const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mindmadetech.in',
    port: 587,
    secure : false,
    auth: {
        user: '_mainaccount@mindmadetech.in',
        pass: '1boQ[(6nYw6H.&_hQ&'
    },
    tls : {
        rejectUnauthorized : false
    }
});

module.exports = {transporter};