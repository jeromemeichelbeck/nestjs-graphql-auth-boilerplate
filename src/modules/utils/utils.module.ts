import { Module } from '@nestjs/common'
import { BcryptProvider } from './bcrypt.provider'
import { ErrorHandlerProvider } from './error-handler.provider'
import { StringFormatProvider } from './string-format.provider'

@Module({
    providers: [ErrorHandlerProvider, BcryptProvider, StringFormatProvider],
    exports: [ErrorHandlerProvider, BcryptProvider, StringFormatProvider],
})
export class UtilsModule {}
