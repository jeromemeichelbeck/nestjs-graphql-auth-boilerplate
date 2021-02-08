import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common'
import { Redis } from 'ioredis'
import expressSession from 'express-session'
import connectRedis from 'connect-redis'
import { StoreService } from './store.service'

export interface StoreModuleOptions {
    client: Redis
}

interface StoreModuleAsyncOptions {
    imports: Array<Type<any> | string | any>
    inject: Array<Type<any> | string | any>
    useFactory: (...args: any[]) => StoreModuleOptions
}

@Module({
    providers: [StoreService],
    exports: [StoreService],
})
@Global()
export class StoreCoreModule {
    public static forRootAsync({
        imports,
        inject,
        useFactory,
    }: StoreModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [
            {
                provide: 'STORE_MODULE_OPTIONS',
                inject,
                useFactory,
            },
            {
                provide: 'REDIS_STORE',
                inject: ['STORE_MODULE_OPTIONS'],
                useFactory: ({ client }: StoreModuleOptions) => {
                    const RedisStore = connectRedis(expressSession)
                    const store = new RedisStore({ client })

                    return store
                },
            },
        ]

        return {
            module: StoreCoreModule,
            imports,
            providers,
        }
    }
}
