import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { addUserDTO } from './dto/add-avatar.dto';

import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';

import axios from 'axios';

import { ClientProxy } from '@nestjs/microservices';

import 'dotenv/config';



@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, @Inject('RMQ_CONNECTION') private client: ClientProxy) {}

  async create(dto: CreateUserDto): Promise<User> {
    
    const userId = await this.userModel.findOne({ id: dto.id })
    
    if(userId) throw new BadRequestException('id already exists')
    
    const createUser = await this.userModel.create(dto)
    await this.client.emit('teste',`USER CREATED: ${createUser}`)
    
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
    await this.userModel.deleteOne({id: id})
  }

  async addAvatar(id : string, body: addUserDTO) {
    const { avatar } = body
    const user = await this.userModel.updateOne(
      { id: id },
      {$set: {avatar: avatar}}
    )

    if(!user) throw new NotFoundException('user can not found to update')
  }
}
