import { Module } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserSchema, User } from 'src/users/schema/user.schema'

import { MongooseModule } from '@nestjs/mongoose'

import { sendEmailModule } from 'src/sendEMail/sendemail.module'
import { EmailService } from 'src/sendEMail/sendemail.service'
import { AuthService } from 'src/auth/auth.service'

import { ClientsModule,Transport } from '@nestjs/microservices'

import 'dotenv/config'
import { AuthController } from 'src/auth/auth.controller'


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    sendEmailModule,
    ClientsModule.register([{
      name: 'RMQ_CONNECTION',
      transport: Transport.RMQ,
      options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'user',
          queueOptions: {
              durable: false
          }
      }
  }])
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, EmailService, AuthService]
})
export class UsersModule {}
