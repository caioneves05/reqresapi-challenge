import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ClientProxy } from '@nestjs/microservices'

import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { addUserDTO } from './dto/add-avatar.dto'

import { User } from 'src/users/schema/user.schema'
import { Model } from 'mongoose'

import * as fs from 'fs'
import axios from 'axios'
import * as CryptoJS from 'crypto-js'
import 'dotenv/config'
import { AuthService } from 'src/auth/auth.service'


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, @Inject('RMQ_CONNECTION') private client: ClientProxy, private jwt: AuthService) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    dto.password = CryptoJS.SHA256(dto.password)
    const userId = await this.userModel.findOne({ id: dto.id })

    if (userId) throw new BadRequestException('id already exists')

    const createUser = await this.userModel.create(dto)
    await this.client.emit('teste', `USER CREATED: ${createUser}`)

    return createUser.save()
  }

  /*
  async findAllDb() {
    const result = await this.userModel.find()
    return result
  }
  */

  async findUserDb(emailUser: string, passwordUser: string) {
    const user = await this.userModel.findOne({ email: emailUser, password: passwordUser })
    return user
  }

  async updateDb(id: string, updateUserDto: UserDto) {
    const user = await this.userModel.findOne({ id: id })
    if (!user) throw new NotFoundException('user can not found to update')
    else {
      await this.userModel.updateOne({ id: id }, updateUserDto)
      await user.save()
      return updateUserDto
    }

  }

  async addAvatarDb(id: string, Url: addUserDTO) {
    const { avatar } = Url
    const user = await this.userModel.updateOne(
      { id: id },
      { $set: { avatar: avatar } }
    )

    if (!user) throw new NotFoundException('user can not found to update')
  }

  async removeUser(id: string) {
    await this.userModel.deleteOne({ id: id })
  }

  async fileNameHashed(id: string) {
    const user = await this.userModel.findOne({ id: id })
    const fileName = user.first_name + user.last_name

    const hash = CryptoJS.SHA256(fileName)

    const fileNameHash = hash.toString(CryptoJS.enc.Hex)

    return fileNameHash
  }

  readFileFolder(path, file): boolean {

    let haveFile

    fs.readdir(path, (_, arquivos) => {
      arquivos.forEach(arquivo => {
        if (arquivo === file) {
          haveFile = true
        }
        else {
          haveFile = false
        }
      })
    })
    return haveFile
  }

  async avatarDownload(url, idUser): Promise<void> {
    const path = ('assets/')
    const fileName = await this.fileNameHashed(idUser)
    const readFileFolder = this.readFileFolder(path, `${fileName}.jpg`)


    if (!readFileFolder) {
      try {
        const response = await axios({
          method: 'get',
          url: url,
          responseType: 'arraybuffer',
        })
        const buffer = Buffer.from(response.data, 'binary')
        return await fs.promises.writeFile(path + `${fileName}.jpg`, buffer)
      }
      catch (err) {
        return err
      }
    }
  }

}  