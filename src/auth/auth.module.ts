import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'

import 'dotenv/config'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/users/schema/user.schema'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
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
        }]),
        JwtModule.register({
            global: true,
            secret: process.env.PHRASE_JWT,
            signOptions: {expiresIn: '60s'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})

export class AuthModule {}