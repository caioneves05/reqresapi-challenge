import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import axios from 'axios';

@Injectable()
export class UsersService {

  //To-do
  create(createUserDto) {

    return createUserDto;
  }

  async findAll() {
    const result = await axios.get('https://reqres.in/api/users')
    return await result.data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
