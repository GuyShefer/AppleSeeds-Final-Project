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

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'havaya.jewelry1@gmail.com',
        subject: `Thanks for joining us ${name}`,
        text : `Welcome to the "Havaya Jewlery" ${name}!`
    })
}

const sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('Check');
    sgMail.send({
        to: email,
        from: 'havaya.jewelry1@gmail.com',
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
}

module.exports = { 
    sendWelcomeEmail,
    sendConfirmationEmail,
}