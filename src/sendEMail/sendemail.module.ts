import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import 'dotenv/config'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.USERNAME_MAILGUNL,
          pass: process.env.PASSWORD_MAILGUN,
        },
      },
    })
  ]
})
export class sendEmailModule {}
