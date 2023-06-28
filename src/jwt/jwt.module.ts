import { Module } from '@nestjs/common'
import { JwtService } from './jwt.service'

import 'dotenv/config'


@Module({
    imports: [],
    providers: [],
    exports: [ JwtService ]
})

export class RmqModule {}