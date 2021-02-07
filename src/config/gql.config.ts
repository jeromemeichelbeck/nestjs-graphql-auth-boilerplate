import { GqlModuleOptions } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CaughtError } from '../modules/common/classes/caught-grapghql-error.class'
import { ConfigEnum } from '../types/config'

export const gqlConfig = (): { [ConfigEnum.gql]: GqlModuleOptions } => ({
    gql: {
        autoSchemaFile: true,
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
        formatError: (error: GraphQLError) => {
            const caughtErrors: CaughtError[] = []

            const errors = error.extensions!.caughtErrors as CaughtError[]

            if (!errors) {
                if (process.env.NODE_ENV === 'production') {
                    console.log(error)
                    return {
                        message: 'Unexpected error',
                    }
                }
                return error
            }

            for (const myError of errors) {
                caughtErrors.push(myError)
            }

            return {
                message: error.message,
                caughtErrors,
            }
        },
    },
})
