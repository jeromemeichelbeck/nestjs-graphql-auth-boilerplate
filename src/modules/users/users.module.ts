import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsModule } from '../utils/utils.module'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository]), UtilsModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UserModule {}
