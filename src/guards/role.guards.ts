import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { MySession } from '../decorators/sess.decorator'
import { AuthService } from '../modules/auth/auth.service'
import { CaughtGraphQLError } from '../modules/common/classes/caught-grapghql-error.class'
import { ErrorCodeEnum } from '../types/error-codes'
import { RoleEnum, ROLES } from '../types/roles'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<RoleEnum[]>(
            ROLES,
            context.getHandler(),
        )
        if (!requiredRoles) return true

        const ctx = GqlExecutionContext.create(context)
        const session: MySession = ctx.getContext().req.session
        const { userRoles } = session

        if (
            userRoles &&
            this.authService.checkRoles(userRoles, requiredRoles)
        ) {
            return true
        }

        throw new CaughtGraphQLError([
            {
                code: ErrorCodeEnum.FORBIDDEN,
                message: 'Forbidden action',
                fields: [],
            },
        ])
    }
}
