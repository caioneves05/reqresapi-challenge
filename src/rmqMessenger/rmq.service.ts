import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import 'dotenv/config';


@Injectable()
export class RMQService {
  constructor(@Inject('RMQ_CONNECTION') private readonly client: ClientProxy) {}

  async sendMessage(message: string) {
    await this.client.emit('create-user', message)
  }
}