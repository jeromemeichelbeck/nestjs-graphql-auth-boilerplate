import { RedisModuleOptions } from 'nestjs-redis'
import { ConfigEnum } from '../types/config.enum'

export const redisConfig = (): { [ConfigEnum.redis]: RedisModuleOptions } => {
    return {
        [ConfigEnum.redis]: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
        },
    }
}
