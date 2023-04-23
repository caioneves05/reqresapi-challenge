import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from 'src/users/schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { sendEmailModule } from 'src/sendEMail/sendemail.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    sendEmailModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
