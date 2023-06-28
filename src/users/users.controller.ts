import { Response } from 'express'

import { Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Res,
  Put,
 } from '@nestjs/common'

import { UsersService } from './users.service'
import { EmailService } from 'src/sendEMail/sendemail.service'
import { UpdateUserDto } from './dto/update-user.dto'

import { CreateUserDto } from './dto/create-user.dto'
import { addUserDTO } from './dto/add-avatar.dto'



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly emailservice: EmailService) {}

  @Post()
  async create(@Body() userCreate: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.createUser(userCreate)
    
    await this.usersService.avatarDownload(userCreate.avatar, userCreate.id)

    await this.emailservice.sendEmailSMTP(user.email)
    res.json({sendEmailUser: user.email})
  }

  @Get()
  findAll() {
    return this.usersService.findAllDb()
  }

  @Get(':id')
  findOneDb(@Param('id') id: string) {
    return this.usersService.findOneDb(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateDb(id, updateUserDto)
  }
  // Then implement addAvatar validation for mongoDb. 
  @Put('avatar/:id')
  async addAvatarDb(@Param('id') id: string, @Body() url: addUserDTO, @Res() res: Response) {
    this.usersService.addAvatarDb(id, url)
    await this.usersService.avatarDownload(url.avatar, id)
    res.json({message: 'message: Avatar added in user.'})
  }

  @Delete(':id')
  removeUser(@Param('id') id: string, @Res() res: Response ) {
    this.usersService.removeUser(id)
    res.json({message: 'user removed sucessfully'})
  }

}
