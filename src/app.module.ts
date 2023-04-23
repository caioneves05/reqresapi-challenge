import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { sendEmailModule } from './sendEMail/sendemail.module';


const MONGO_URI = process.env.MONGO_URI

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI), 
    UsersModule,
    sendEmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
