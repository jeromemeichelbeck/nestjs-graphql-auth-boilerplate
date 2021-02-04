import { RedisModuleOptions } from 'nestjs-redis'

export const redisConfig = (): { redis: RedisModuleOptions } => ({
    redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
    },
})
