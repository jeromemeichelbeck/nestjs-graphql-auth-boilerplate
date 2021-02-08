import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

export const Ip = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context!)
        const ip: string = ctx.getContext().req.ip

        return ip
    },
)
