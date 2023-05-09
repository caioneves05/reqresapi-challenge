import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import 'dotenv/config'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.EMAIL_GMAIL,
          pass: process.env.PASSWORD_GMAIL,
        },
      },
    }), 
  ]
})
export class sendEmailModule {}