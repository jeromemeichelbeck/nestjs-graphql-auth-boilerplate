import { GqlModuleOptions } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { MyExtensions } from '../modules/common/classes/my-grapghql-error.class'
import { ConfigEnum } from '../types/config'

export const gqlConfig = (): { [ConfigEnum.gql]: GqlModuleOptions } => ({
    gql: {
        autoSchemaFile: true,
        formatError: (error: GraphQLError) => {
            const { code, message, fields } = error.extensions as MyExtensions
            return {
                code,
                message,
                fields,
            }
        },
    },
})
