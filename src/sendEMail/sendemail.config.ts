/* import * as nodemailer from 'nodemailer';
import 'dotenv/config'

export const sendEmailTransporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', //host smtp
    secure: true, //regras de segurança do serviço smtp
    port: 587, // porta
    auth: { //dados do usuário e senha
        user: process.env.USERNAME_MAILGUN,
        pass: process.env.PASSWORD_MAILGUN,
    },
    ignoreTLS: true,
  })

*/