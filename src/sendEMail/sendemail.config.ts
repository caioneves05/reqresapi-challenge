import * as nodemailer from 'nodemailer';

export const sendEmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.PASSWORD_GMAIL
    }
  });
  