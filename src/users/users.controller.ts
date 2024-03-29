import { Response } from 'express'

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  NotFoundException,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { EmailService } from 'src/sendEMail/sendemail.service'

import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { addUserDTO } from './dto/add-avatar.dto'

import * as CryptoJS from 'crypto-js'

@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly emailService: EmailService,
    ) { }

    @Post()
    async create(@Body() userCreate: CreateUserDto, @Res() res: Response) {
      const user = await this.usersService.createUser(userCreate)

      await this.usersService.avatarDownload(userCreate.avatar, userCreate.id)

      //await this.emailService.sendEmailSMTP(user.email)
      res.json({ sendEmailUser: user.email })
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
      return this.usersService.updateDb(id, updateUserDto)
    }
    // Then implement addAvatar validation for mongoDb. 
    @Put('avatar/:id')
    async addAvatarDb(@Param('id') id: string, @Body() url: addUserDTO, @Res() res: Response) {
      this.usersService.addAvatarDb(id, url)
      await this.usersService.avatarDownload(url.avatar, id)
      res.json({ message: 'message: Avatar added in user.' })
    }

    @Delete(':id')
    removeUser(@Param('id') id: string, @Res() res: Response) {
      this.usersService.removeUser(id)
      res.json({ message: 'user removed sucessfully' })
    }

}
