import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionsRepository } from './sessions.repository'
import { SessionsService } from './sessions.service'

@Module({
    imports: [TypeOrmModule.forFeature([SessionsRepository])],
    providers: [SessionsService],
    exports: [SessionsService],
})
export class SessionsModule {}
