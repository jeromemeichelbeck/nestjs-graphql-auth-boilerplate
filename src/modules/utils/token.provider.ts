import { Injectable } from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
import { v4 as uuid } from 'uuid'
import { RedisPrefixEnum } from '../../types/redis'

@Injectable()
export class TokenProvider {
    constructor(private readonly redisService: RedisService) {}

    async generateLink(
        prefix: RedisPrefixEnum,
        userId: number,
    ): Promise<string> {
        const client = this.redisService.getClient()
        const token = uuid()
        const key = `${prefix}:${token}`

        console.log(key)

        let time = 1000 * 60 * 15
        switch (prefix) {
            case RedisPrefixEnum.CONFIRM_EMAIL:
                time = 1000 * 60 * 60 * 24 * 7
                break
            case RedisPrefixEnum.FORGOT_PASSWORD:
                time = 1000 * 60 * 15
                break
        }

        await client.set(key, userId, 'ex', time)

        return `http://localhost:3000/${prefix}/${token}`
    }

    async validateToken(key: string, userId: number): Promise<boolean> {
        const client = this.redisService.getClient()

        const id = await client.get(key)

        if (id && +id === userId) {
            await client.del(key)

            return true
        }

        return false
    }
}
