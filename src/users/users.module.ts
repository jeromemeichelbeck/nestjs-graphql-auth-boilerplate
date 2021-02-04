import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    providers: [UsersService, UsersResolver],
})
export class UserModule {}
