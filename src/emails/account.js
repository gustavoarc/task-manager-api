const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name ) =>{

    sgMail.send( {
        to:  email , 
        from: 'gustavoarc@gmail.com', 
        subject: 'Thaks  for joining in! ', 
        text: `Welcome to the app, ${name}. Let me know you get along withn the app `
    })
}

const sendCancelationEmail = (email, name ) =>{

    sgMail.send( {
        to:  email , 
        from: 'gustavoarc@gmail.com', 
        subject: 'Sorry to see you go ! ', 
        text: `Goodbye, ${name}. I hope to  see you back somtime soon `
    })
}


module.exports = {
    sendWelcomeEmail , 
    sendCancelationEmail
}

