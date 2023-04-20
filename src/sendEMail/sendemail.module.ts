import { Module } from '@nestjs/common';
import { emailService } from './sendemail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import 'dotenv/config'

@Module({
    imports: [
      MailerModule.forRoot({
        transport: {
          host: 'smtp.mailgun.org', //host smtp
          secure: false, //regras de segurança do serviço smtp
          port: 587, // porta
          auth: { //dados do usuário e senha
            user: process.env.USERNAME_MAILGUN,
            pass: process.env.PASSWORD_MAILGUN,
          },
          ignoreTLS: true,
        },
        defaults: { // configurações que podem ser padrões
          from: '"',
        },
      }),
    ],
    providers: [emailService],
  })
  export class sendEmailModule {}
  