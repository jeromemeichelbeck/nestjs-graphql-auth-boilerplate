import {
    MailerModule as MailerCoreModule,
    MailerOptions,
} from '@nestjs-modules/mailer'
import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule, RedisService } from 'nestjs-redis'
import { ConfigEnum } from '../types/config'

export const MailerModule: DynamicModule = MailerCoreModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cs: ConfigService) =>
        cs.get<MailerOptions>(ConfigEnum.mailer)!,
})
