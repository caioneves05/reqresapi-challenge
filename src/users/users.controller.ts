import { Response } from 'express';
import { Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Res,
  Put
 } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { MailerService } from '@nestjs-modules/mailer';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly mailService: MailerService) {}

  @Post()
  async create(@Body() userCreate: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(userCreate)
    await this.mailService.sendMail({
      to: user.email,
      from: 'Caio Neves test',
      subject: 'Sending Email with NestJS.',
      html: 'Test completed successfully.',
    })
    
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
