import { Module } from '@nestjs/common'
import { RedisModule } from 'nestjs-redis'
import { BcryptProvider } from './bcrypt.provider'
import { ErrorHandlerProvider } from './error-handler.provider'
import { MailerProvider } from './mailer.provider'
import { StringFormatProvider } from './string-format.provider'
import { TokenProvider } from './token.provider'

@Module({
    imports: [RedisModule],
    providers: [
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
    ],
    exports: [
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
    ],
})
export class UtilsModule {}
