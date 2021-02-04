import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'
import { CreateUserInput } from './input-types/create-user.input'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.usersService.getUsers()
    }
}
