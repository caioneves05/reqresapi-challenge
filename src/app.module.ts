import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { sendEmailModule } from './sendEMail/sendemail.module';
import { ConfigModule } from '@nestjs/config';


const MONGO_URI = process.env.MONGO_URI

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI), 
    UsersModule,
    sendEmailModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
