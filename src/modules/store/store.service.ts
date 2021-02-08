import { Inject, Injectable } from '@nestjs/common'
import { RedisStore } from 'connect-redis'
import { REDIS_STORE } from './store.constants'

@Injectable()
export class StoreService {
    constructor(@Inject(REDIS_STORE) private readonly store: RedisStore) {}

    getStore(): RedisStore {
        return this.store
    }
}
