import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';

import axios from 'axios';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel() private readonly serviceEmail: ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createUser = await this.userModel.create(user)
    this.serviceEmail.sendEMail(createUser.email)
    return createUser.save()
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
