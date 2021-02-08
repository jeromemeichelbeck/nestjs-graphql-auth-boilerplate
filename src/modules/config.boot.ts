import { DynamicModule } from '@nestjs/common'
import { ConfigModule as ConfigCoreModule } from '@nestjs/config'
import { dbConfig } from '../config/db.config'
import { gqlConfig } from '../config/gql.config'
import { mailerConfig } from '../config/mailer.config'
import { redisConfig } from '../config/redis.config'
import { sessionConfig } from '../config/session.config'

export const ConfigModule: DynamicModule = ConfigCoreModule.forRoot({
    cache: true,
    load: [dbConfig, redisConfig, sessionConfig, mailerConfig, gqlConfig],
})
