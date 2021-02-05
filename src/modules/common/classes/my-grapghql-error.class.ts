import { GraphQLError } from 'graphql'
import { ErrorCodeEnum } from '../../../types/error-codes'

export interface MyExtensions {
    code: ErrorCodeEnum
    message: string
    fields: string[]
}

export class MyGraphQLError extends GraphQLError {
    constructor({ code, message, fields }: MyExtensions) {
        super('', null, null, null, null, null, {
            code,
            message,
            fields,
        })
    }

    extensions!: (MyExtensions & { [key: string]: any }) | undefined
}
