import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

export const Req = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context!)
        const req: Request = ctx.getContext().req

        return req
    },
)
