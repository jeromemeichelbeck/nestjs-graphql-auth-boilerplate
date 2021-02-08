import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule, RedisService } from 'nestjs-redis'
import { StoreCoreModule } from './store/store.module'

export const StoreModule = StoreCoreModule.forRootAsync({
    imports: [ConfigModule, RedisModule],
    inject: [ConfigService, RedisService],
    useFactory: (configService: ConfigService, redisService: RedisService) => {
        return {
            client: redisService.getClient(),
        }
    },
})
