import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    GqlModuleOptions,
    GraphQLModule as GraphQLCoreModule,
} from '@nestjs/graphql'
import { ConfigEnum } from '../types/config'

export const GraphQlModule: DynamicModule = GraphQLCoreModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cs: ConfigService) =>
        cs.get<GqlModuleOptions>(ConfigEnum.gql)!,
})
