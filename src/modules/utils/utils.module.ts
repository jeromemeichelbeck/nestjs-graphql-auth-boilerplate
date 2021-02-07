import { Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'
import { BcryptProvider } from './bcrypt.provider'
import { ErrorHandlerProvider } from './error-handler.provider'
import { MailerProvider } from './mailer.provider'
import { StringFormatProvider } from './string-format.provider'
import { TokenProvider } from './token.provider'
import { UtilsService } from './utils.service'

@Module({
    imports: [RedisModule],
    providers: [
        UtilsService,
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
    ],
    exports: [
        UtilsService,
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
    ],
})
export class UtilsModule {}
