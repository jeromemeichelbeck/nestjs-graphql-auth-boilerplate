import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule, RedisService } from 'nestjs-redis'
import { ConfigEnum } from '../types/config'
import { StoreCoreModule, StoreModuleOptions } from './store/store.module'

export const StoreModule = StoreCoreModule.forRootAsync({
    imports: [ConfigModule, RedisModule],
    inject: [ConfigService, RedisService],
    useFactory: (configService: ConfigService, redisService: RedisService) => {
        return {
            client: redisService.getClient(),
            ...configService.get<StoreModuleOptions>(ConfigEnum.redisStore),
        }
    },
})
