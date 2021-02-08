import { Inject, Injectable } from '@nestjs/common'
import { RedisStore } from 'connect-redis'

@Injectable()
export class StoreService {
    constructor(@Inject('REDIS_STORE') private readonly store: RedisStore) {}

    getStore(): RedisStore {
        return this.store
    }
}
