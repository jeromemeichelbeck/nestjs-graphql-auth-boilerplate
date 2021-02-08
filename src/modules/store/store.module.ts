import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common'
import expressSession from 'express-session'
import connectRedis, { RedisStoreOptions } from 'connect-redis'
import { StoreService } from './store.service'
import { REDIS_STORE, STORE_MODULE_OPTIONS } from './store.constants'

export interface StoreModuleOptions extends RedisStoreOptions {}

interface StoreModuleAsyncOptions {
    imports: Array<Type<any> | string | any>
    inject: Array<Type<any> | string | any>
    useFactory: (...args: any[]) => StoreModuleOptions
}

@Module({})
export class StoreCoreModule {
    public static forRootAsync({
        imports,
        inject,
        useFactory,
    }: StoreModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [
            {
                provide: STORE_MODULE_OPTIONS,
                inject,
                useFactory,
            },
            {
                provide: REDIS_STORE,
                inject: [STORE_MODULE_OPTIONS],
                useFactory: (storeOptions: StoreModuleOptions) => {
                    const RedisStore = connectRedis(expressSession)
                    const store = new RedisStore(storeOptions)

                    return store
                },
            },
            StoreService,
        ]

        return {
            module: StoreCoreModule,
            imports,
            providers,
            exports: providers,
        }
    }
}
