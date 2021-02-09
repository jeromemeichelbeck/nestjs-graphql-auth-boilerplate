import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Session as ExpressSession } from 'express-session'
import { RoleEnum } from '../types/roles'

export interface MySession extends ExpressSession {
    userId: number
    userRoles: RoleEnum[]
    lastVisited: Date
}

export const Sess = createParamDecorator(
    (key?: keyof MySession, context?: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context!)
        const session: MySession = ctx.getContext().req.session

        if (key) {
            return session[key]
        }

        return session
    },
)
