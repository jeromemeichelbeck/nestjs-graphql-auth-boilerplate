import { Injectable } from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
import { v4 as uuid } from 'uuid'
import { MailTypeEnum } from '../../types/mails'

@Injectable()
export class TokenProvider {
    constructor(private readonly redisService: RedisService) {}

    async generateLink(prefix: MailTypeEnum, payload: any): Promise<string> {
        const client = this.redisService.getClient()
        const token = uuid()
        const key = `${prefix}:${token}`

        if (process.env.NODE_ENV === 'development')
            console.log({ key, payload })

        let time = 1000 * 60 * 15
        switch (prefix) {
            case MailTypeEnum.CONFIRM_EMAIL:
                time = 1000 * 60 * 60 * 24 * 7
                break
            case MailTypeEnum.CHANGE_PASSWORD:
                time = 1000 * 60 * 15
                break
        }

        await client.set(key, JSON.stringify(payload), 'ex', time)

        return `${process.env.CLIENT_URL}/${prefix}/${token}`
    }

    async validateToken(prefix: MailTypeEnum, token: string): Promise<any> {
        const client = this.redisService.getClient()
        const key = `${prefix}:${token}`

        const payload = await client.get(key)

        if (payload) {
            await client.del(key)

            return JSON.parse(payload)
        }

        return false
    }
}
