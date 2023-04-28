import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from 'src/users/schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { sendEmailModule } from 'src/sendEMail/sendemail.module';
import { RMQService } from 'src/rmqMessenger/rmq.service';
import { RMQModule } from 'src/rmqMessenger/rmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  imports: [
    ClientsModule.register([
      {
          name: 'RMQ_CONNECTION',
          transport: Transport.RMQ,
          options: {
              urls: [process.env.RABBITMQ_URI],
              queue: 'create-user',
              queueOptions: {
                  durable: false
              }
          }
      }
  ]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    sendEmailModule
  ],
  controllers: [UsersController],
  providers: [UsersService, RMQService]
})
export class UsersModule {}
