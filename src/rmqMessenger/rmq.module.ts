import { Module } from '@nestjs/common';
import { RMQService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config'


@Module({
    imports: [
    
    ],
    controllers: [],
    providers: [RMQService]
})

export class RMQModule {}