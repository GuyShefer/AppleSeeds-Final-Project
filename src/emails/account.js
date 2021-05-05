const sgMail = require('@sendgrid/mail')
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'shefer.guy1@gmail.com',
//     from: 'havaya.jewelry1@gmail.com',
//     subject: 'this is my firt creation',
//     text: 'I hope this one actually get to you.',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// })

const setWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'havaya.jewelry1@gmail.com',
        subject: `Thanks for joining us ${name}`,
        text : `Welcome to the "Havaya Jewlery" ${name}!`
    })
}

module.exports = { 
    setWelcomeEmail
}