import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { UserModule } from '../users/users.module'
import { UtilsModule } from '../utils/utils.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [UserModule, MailerModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
