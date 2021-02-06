import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Res = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context!)
        const res: Response = ctx.getContext().req.res

        return res
    },
)
