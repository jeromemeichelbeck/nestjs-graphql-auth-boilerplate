import { RedisStoreOptions } from 'connect-redis'
import { NestSessionOptions } from 'nestjs-session'
import { ConfigEnum } from '../types/config.enum'

export const sessionConfig = (): {
    [ConfigEnum.redisStore]: RedisStoreOptions
    [ConfigEnum.sess]: NestSessionOptions
} => {
    return {
        [ConfigEnum.redisStore]: {
            disableTouch: true,
        },
        [ConfigEnum.sess]: {
            session: {
                name: process.env.SESS_NAME,
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 1000 * 3600 * 24 * 365 * 10,
                },
                secret: process.env.SESS_SECRET,
                resave: false,
                saveUninitialized: false,
            },
        },
    }
}
