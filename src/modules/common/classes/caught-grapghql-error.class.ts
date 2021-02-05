import { GraphQLError } from 'graphql'
import { ErrorCodeEnum } from '../../../types/error-codes'

export interface CaughtError {
    code: ErrorCodeEnum
    message: string
    fields: string[]
}

export class CaughtGraphQLError extends GraphQLError {
    constructor(caughtErrors: CaughtError[]) {
        const message = `${caughtErrors.length} error${
            caughtErrors.length === 1 ? '' : 's'
        } has occured`
        super(message, null, null, null, null, null, { caughtErrors })
    }

    extensions!: { [key: string]: any } & { caughtErrors: CaughtError[] }
}
