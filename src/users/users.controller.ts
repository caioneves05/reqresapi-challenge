import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { emailService } from 'src/sendEMail/sendemail.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userCreate: CreateUserDto, @Res() res: Response, @Inject() emailService: emailService) {
    const user = await this.usersService.create(userCreate)
    await  emailService.Email(user.email)
    return res.json({userCreated: `${user}` })
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
