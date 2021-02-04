import { GqlModuleOptions } from '@nestjs/graphql'

export const gqlConfig = (): { gql: GqlModuleOptions } => ({
    gql: {
        autoSchemaFile: true,
    },
})
