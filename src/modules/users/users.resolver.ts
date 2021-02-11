import { UseGuards } from '@nestjs/common'
import { Query, ResolveProperty, Resolver, Root } from '@nestjs/graphql'
import { Roles } from '../../decorators/roles.decorator'
import { MySession, Sess } from '../../decorators/sess.decorator'
import { AuthGuard } from '../../guards/auth.guard'
import { RolesGuard } from '../../guards/role.guards'
import { RoleEnum } from '../../types/roles'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @ResolveProperty(() => String, { nullable: true })
    email(@Sess() session: MySession, @Root() user: User): string | null {
        return session.userRoles.includes(RoleEnum.ADMIN) ||
            session.userId === user.id
            ? user.email
            : null
    }

    @Query(() => User)
    @UseGuards(AuthGuard)
    async myProfile(@Sess('userId') userId: number): Promise<User> {
        return await this.usersService.findOneById(userId)
    }

    @Query(() => [User])
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard)
    async users(): Promise<User[]> {
        return this.usersService.getUsers()
    }
}
