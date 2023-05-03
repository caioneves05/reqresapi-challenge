import { Response } from 'express';
import { Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Res,
  Put,
 } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/sendEMail/sendemail.service';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly emailservice: EmailService) {}

  @Post()
  async create(@Body() userCreate: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(userCreate)
    await this.emailservice.sendEmailSMTP(user.email)
    res.json({sendEmailUser: user.email})
  }

  @Get()
  findAll() {
    return this.usersService.findAllDb()
  }

  @Get('api/')
  findAllApi() {
    return this.usersService.findAllApi();
  }

  @Get(':id')
  findOneDb(@Param('id') id: string) {
    return this.usersService.findOneDb(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateDb(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, res: Response ) {
    this.usersService.remove(id);
    res.status(200).json('user removed sucessfully')
  }
}
