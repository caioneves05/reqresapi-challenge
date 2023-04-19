import { Injectable } from "@nestjs/common";
import  * as nodemailer  from 'nodemailer';
import { sendEmailTransporter } from "./sendemail.config";
import { error } from "console";

@Injectable()
export class ServiceEmail {

    async Email(email: string,) {
        const mailOPtions = {
            from: process.env.EMAIL_GMAIL,
            to: email,
            subject: 'Create user.',
            text: 'A new user has been created in the database.'
        }

        sendEmailTransporter.sendEMail(mailOPtions, (error, res) => {
            if(error) {
                console.log(error)
            }else {
                console.log(`Email enviado: ${res.Response}`)
            }
        })
    }
}