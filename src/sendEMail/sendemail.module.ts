import { Module } from '@nestjs/common';
import { ServiceEmail } from './sendemail.service';

@Module({
    controllers: [],
    providers: [ServiceEmail],
  })
  export class sendEmailModule {}
  