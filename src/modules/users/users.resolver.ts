import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from '../../guards/auth.guard'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    @UseGuards(AuthGuard)
    async users(): Promise<User[]> {
        return this.usersService.getUsers()
    }
}
