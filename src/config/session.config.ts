import { RedisStoreOptions } from 'connect-redis'
import { NestSessionOptions } from 'nestjs-session'

export const sessionConfig = (): {
    redisStore: RedisStoreOptions
    sess: NestSessionOptions
} => {
    return {
        redisStore: {
            disableTouch: true,
        },
        sess: {
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
