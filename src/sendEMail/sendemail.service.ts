import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import 'dotenv/config'

@Injectable()
export class emailService {

    constructor(private maillerSErvice: MailerService) {}

    async Email(email: string) {
        await this.maillerSErvice.sendMail({
            from: process.env.EMAIL_GMAIL,
            to: email,
            subject: 'Create user.',
            html: '<h3> A new user has been created in the database. </h3>'
        })
    }
}