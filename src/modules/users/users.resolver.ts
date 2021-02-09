import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorators/roles.decorator'
import { Sess } from '../../decorators/sess.decorator'
import { AuthGuard } from '../../guards/auth.guard'
import { RolesGuard } from '../../guards/role.guards'
import { RoleEnum } from '../../types/roles'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}
    @Query(() => User)
    async myProfile(@Sess('userId') userId: number): Promise<User> {
        return await this.usersService.findOneById(userId)
    }

    @Query(() => [User])
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async users(): Promise<User[]> {
        return this.usersService.getUsers()
    }
}
