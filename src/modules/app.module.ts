import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import connectRedis, { RedisStoreOptions } from 'connect-redis'
import session from 'express-session'
import { RedisModule, RedisModuleOptions, RedisService } from 'nestjs-redis'
import { NestSessionOptions, SessionModule } from 'nestjs-session'
import { dbConfig } from '../config/db.config'
import { gqlConfig } from '../config/gql.config'
import { redisConfig } from '../config/redis.config'
import { sessionConfig } from '../config/session.config'
import { ConfigEnum } from '../types/config'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [dbConfig, redisConfig, sessionConfig, gqlConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (cs: ConfigService) =>
                cs.get<TypeOrmModuleOptions>(ConfigEnum.db)!,
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) =>
                cs.get<RedisModuleOptions>(ConfigEnum.redis)!,
        }),
        SessionModule.forRootAsync({
            imports: [ConfigModule, RedisModule],
            inject: [ConfigService, RedisService],
            useFactory: (cs: ConfigService, redis: RedisService) => {
                const client = redis.getClient()
                const RedisStore = connectRedis(session)
                const store = new RedisStore({
                    ...cs.get<RedisStoreOptions>(ConfigEnum.redisStore),
                    client,
                })

                return {
                    session: {
                        ...cs.get<NestSessionOptions>(ConfigEnum.sess)
                            ?.session!,
                        store,
                    },
                }
            },
        }),
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => ({
                ...cs.get<GqlModuleOptions>(ConfigEnum.gql)!,
            }),
        }),
        AuthModule,
    ],
})
export class AppModule {}