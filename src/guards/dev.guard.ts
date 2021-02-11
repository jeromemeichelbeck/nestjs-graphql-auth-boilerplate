import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CaughtGraphQLError } from '../modules/common/classes/caught-grapghql-error.class'
import { ErrorCodeEnum } from '../types/error-codes'

@Injectable()
export class DevGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context)
        if (ctx.getContext().req.cookies.isDev === process.env.DEV_COOKIE)
            return true

        throw new CaughtGraphQLError([
            {
                code: ErrorCodeEnum.FORBIDDEN,
                message: 'Forbidden action',
                fields: [],
            },
        ])
    }
}
