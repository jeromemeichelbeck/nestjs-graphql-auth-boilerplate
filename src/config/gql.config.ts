import { GqlModuleOptions } from '@nestjs/graphql'
import { ConfigEnum } from '../types/config'

export const gqlConfig = (): { [ConfigEnum.gql]: GqlModuleOptions } => ({
    gql: {
        autoSchemaFile: true,
    },
})
