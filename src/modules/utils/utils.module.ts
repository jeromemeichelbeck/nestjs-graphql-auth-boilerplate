import { Module } from '@nestjs/common'
import { BcryptProvider } from './bcrypt.provider'
import { ErrorHandlerProvider } from './error-handler.provider'
import { MailerProvider } from './mailer.provider'
import { StringFormatProvider } from './string-format.provider'

@Module({
    providers: [
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
    ],
    exports: [
        ErrorHandlerProvider,
        MailerProvider,
        BcryptProvider,
        StringFormatProvider,
    ],
})
export class UtilsModule {}
