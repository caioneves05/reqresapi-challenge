import { Module } from '@nestjs/common'
import { RmqService } from './rmq.service'

import 'dotenv/config'


@Module({
    imports: [],
    providers: [ RmqService ],
    exports: [ RmqService ]
})

export class RmqModule {}