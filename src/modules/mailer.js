const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars') // template engine do handlebars, para utilizar variaveis no html/email

const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host, 
    port, 
    auth: { user, pass }
})

const handlebarOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: './src/resources/mail/',
        layoutsDir: path.resolve('./src/resources/mail/'),
        defaultLayout: 'auth/forgot_password.html',
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}

transport.use('compile', hbs(handlebarOptions));

module.exports = transport