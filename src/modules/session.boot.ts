import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    NestSessionOptions,
    SessionModule as SessionCoreModule,
} from 'nestjs-session'
import { ConfigEnum } from '../types/config'
import { StoreModule } from './store.boot'
import { StoreService } from './store/store.service'

export const SessionModule: DynamicModule = SessionCoreModule.forRootAsync({
    imports: [ConfigModule, StoreModule],
    inject: [ConfigService, StoreService],
    useFactory: (configService: ConfigService, storeService: StoreService) => {
        return {
            session: {
                ...configService.get<NestSessionOptions>(ConfigEnum.sess)
                    ?.session!,
                store: storeService.getStore(),
            },
        }
    },
})
