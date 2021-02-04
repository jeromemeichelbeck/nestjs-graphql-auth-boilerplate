import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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

    @Mutation(() => User)
    createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        return this.usersService.create(createUserInput)
    }
}
