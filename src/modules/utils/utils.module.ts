import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from 'nestjs-redis'
import { ArrayProvider } from './array.provider'
import { BcryptProvider } from './bcrypt.provider'
import { ErrorHandlerProvider } from './error-handler.provider'
import { MailProvider } from './mail.provider'
import { StringFormatProvider } from './string-format.provider'
import { TokenProvider } from './token.provider'
import { UtilsService } from './utils.service'

@Global()
@Module({
    imports: [ConfigModule, RedisModule],
    providers: [
        UtilsService,
        ErrorHandlerProvider,
        MailProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
        ArrayProvider,
    ],
    exports: [
        UtilsService,
        ErrorHandlerProvider,
        MailProvider,
        BcryptProvider,
        StringFormatProvider,
        TokenProvider,
        ArrayProvider,
    ],
})
export class UtilsModule {}
