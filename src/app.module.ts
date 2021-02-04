import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import connectRedis, { RedisStoreOptions } from 'connect-redis'
import session from 'express-session'
import { RedisModule, RedisModuleOptions, RedisService } from 'nestjs-redis'
import { NestSessionOptions, SessionModule } from 'nestjs-session'
import { dbConfig } from './config/db.config'
import { gqlConfig } from './config/gql.config'
import { redisConfig } from './config/redis.config'
import { sessionConfig } from './config/session.config'
import { UserModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dbConfig, gqlConfig, redisConfig, sessionConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (cs: ConfigService) =>
                cs.get<TypeOrmModuleOptions>('db')!,
        }),
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => cs.get<GqlModuleOptions>('gql')!,
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) =>
                cs.get<RedisModuleOptions>('redis')!,
        }),
        SessionModule.forRootAsync({
            imports: [ConfigModule, RedisModule],
            inject: [ConfigService, RedisService],
            useFactory: (cs: ConfigService, redis: RedisService) => {
                const client = redis.getClient()
                const RedisStore = connectRedis(session)
                const store = new RedisStore({
                    ...cs.get<RedisStoreOptions>('redisStore'),
                    client,
                })

                return {
                    session: {
                        ...cs.get<NestSessionOptions>('sess')?.session!,
                        store,
                    },
                }
            },
        }),
        UserModule,
    ],
})
export class AppModule {}
