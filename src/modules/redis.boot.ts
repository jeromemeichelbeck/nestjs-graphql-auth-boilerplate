import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    RedisModule as RedisCoreModule,
    RedisModuleOptions,
    RedisService,
} from 'nestjs-redis'
import { ConfigEnum } from '../types/config'

export const RedisModule: DynamicModule = RedisCoreModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cs: ConfigService) =>
        cs.get<RedisModuleOptions>(ConfigEnum.redis)!,
})
