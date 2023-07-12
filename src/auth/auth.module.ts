import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'

import 'dotenv/config'
import { UsersModule } from 'src/users/users.module'
import { UsersController } from 'src/users/users.controller'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.ratoborrachudopop,
            signOptions: {expiresIn: '60s'},
        })
    ],
    controllers: [AuthController, UsersController],
    providers: [AuthService, UsersService],
    exports: [AuthController]
})

export class AuthModule {}