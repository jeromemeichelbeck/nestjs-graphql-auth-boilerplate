import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CaughtGraphQLError } from '../modules/common/classes/caught-grapghql-error.class'
import { ErrorCodeEnum } from '../types/error-codes'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context)

        if (!!ctx.getContext().req.session.userId) return true

        throw new CaughtGraphQLError([
            {
                code: ErrorCodeEnum.UNAUTHORIZED,
                message: 'Unauthorized action',
                fields: [],
            },
        ])
    }
}
