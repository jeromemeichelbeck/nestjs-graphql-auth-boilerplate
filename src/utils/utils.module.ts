import { Module } from '@nestjs/common'
import { BcryptProvider } from './bcrypt.provider'

@Module({
    providers: [BcryptProvider],
    exports: [BcryptProvider],
})
export class UtilsModule {}
