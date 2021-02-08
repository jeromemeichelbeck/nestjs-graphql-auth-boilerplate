import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule, RedisService } from 'nestjs-redis'
import { NestSessionOptions } from 'nestjs-session'
import { ConfigEnum } from '../types/config'
// import { SessionCoreModule } from './session/session.module'
import { SessionModule as SessionCoreModule } from 'nestjs-session'
import { StoreProvider } from './utils/store.provider'

export const SessionModule: DynamicModule = SessionCoreModule.forRootAsync({
    imports: [ConfigModule, RedisModule],
    inject: [ConfigService, RedisService],
    useFactory: (
        configService: ConfigService,
        storeProvider: StoreProvider,
    ) => {
        return {
            session: {
                ...configService.get<NestSessionOptions>(ConfigEnum.sess)
                    ?.session!,
                store: storeProvider.store,
            },
        }
    },
})
