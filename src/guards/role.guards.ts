import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { MySession } from '../decorators/session.decorator'
import { UsersService } from '../modules/users/users.service'
import { ROLES, RoleEnum } from '../types/roles'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<RoleEnum[]>(
            ROLES,
            context.getHandler(),
        )
        if (!roles) return true

        const ctx = GqlExecutionContext.create(context)
        const session: MySession = ctx.getContext().req.session
        const userId = session.userId
        if (!userId) return false

        const user = await this.userService.findOneById(userId)
        if (!user) return false

        return user.hasRole(roles)
    }
}
