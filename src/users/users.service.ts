import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { Response } from 'express';

import axios from 'axios';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createUser = await this.userModel.create(user)
    return createUser.save()
  }

  async findAllApi() {
    const result = await axios.get('https://reqres.in/api/users')
    return await result.data;
  }

  async findAllDb() {
    const result = await this.userModel.find()
    return result
  }

  async findOneDb(id: string) {
    const user = await this.userModel.findOne({ id : id })
    if(!user) throw new NotFoundException('User not exists.')
    return user
    
  }

  async updateDb(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ id : id})
    if(!user) throw new NotFoundException('user can not found to update')
    else{
      await this.userModel.updateOne({id: id},  updateUserDto)
      await user.save()
      return updateUserDto
    }
    
  }

  async remove(id: string) {
    const user = await this.userModel.deleteOne({id: id})
    if(!user) throw new NotFoundException('user can not found to update')
    return 'User removed sucessfully'
  }
}
