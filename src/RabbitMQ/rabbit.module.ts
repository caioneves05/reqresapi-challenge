import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

@Module({
    imports: [],
    controllers: [],
    providers: [RabbitService]
})

export class rabbitModule {}