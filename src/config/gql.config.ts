import { GqlModuleOptions } from '@nestjs/graphql'
import { ConfigEnum } from '../types/config.enum'

export const gqlConfig = (): { [ConfigEnum.gql]: GqlModuleOptions } => ({
    gql: {
        autoSchemaFile: true,
    },
})
