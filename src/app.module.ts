import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RedisModule, RedisModuleOptions } from 'nestjs-redis'
import { dbConfig } from './config/db.config'
import { gqlConfig } from './config/gql.config'
import { UserModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dbConfig, gqlConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) =>
                cs.get<TypeOrmModuleOptions>('db'),
        }),
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => cs.get<GqlModuleOptions>('gql'),
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) =>
                cs.get<RedisModuleOptions>('gql'),
        }),
        UserModule,
    ],
})
export class AppModule {}
