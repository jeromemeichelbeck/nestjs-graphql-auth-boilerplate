import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorators/roles.decorator'
import { MySession, Session } from '../../decorators/session.decorator'
import { AuthGuard } from '../../guards/auth.guard'
import { RolesGuard } from '../../guards/role.guards'
import { RoleEnum } from '../../types/roles'
import { StoreService } from '../store/store.service'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly storeService: StoreService,
    ) {}

    @Query(() => [User])
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async users(@Session() session: MySession): Promise<User[]> {
        const store = this.storeService.getStore()
        store.get(session.id, (err, sess) => {
            if (err) {
                console.log(err)
            } else {
                console.log(sess)
            }
        })
        return this.usersService.getUsers()
    }
}
