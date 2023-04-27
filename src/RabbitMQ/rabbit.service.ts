import { Injectable } from "@nestjs/common";
import amqp from "amqplib";
import 'dotenv/config';

@Injectable()
export class RabbitService {
    
    async sendMessge() {
        amqp.connect(process.env.RABBITMQ_URI,(err, conn) => {
            conn.createChannel(function (err, channel) {
                const queue = 'reqresapi'
                const msg = 'User created in resres-api.'
                channel.assertQueue(queue, { durable: false })     
                channel.sendToQueue(queue, msg)
                console.log(`Message sent sucessfully: ${msg}`)
            })
            setTimeout(function () { conn.close(); process.exit(0) }, 500)
        })
    }

    async worker(){
        amqp.connect(process.env.RABBITMQ_URI, (err, conn) => {
            conn.createChannel(function (err, ch) {
                const queue = 'reqresapi'

                ch.assertQueue(queue, { durable: false });
                ch.prefetch(1)
                console.log("Waiting for messages. To exit press CTRL+C", queue);
                ch.consume(queue, (msg) => {
                    console.log("Received: ", msg.content.toString());
                }, { noAck: true })
            })
        })
    }

}