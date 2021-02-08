import { RedisStore, RedisStoreOptions } from 'connect-redis'
import { RedisService } from 'nestjs-redis'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../../types/config'

@Injectable()
export class StoreProvider {
    constructor(
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
    ) {
        const client = this.redisService.getClient()
        const RedisStore = connectRedis(expressSession)
        this.store = new RedisStore({
            ...this.configService.get<RedisStoreOptions>(ConfigEnum.redisStore),
            client,
        })
    }

    store: RedisStore
}
