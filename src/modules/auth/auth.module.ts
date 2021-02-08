import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { SessionsModule } from '../sessions/sessions.module'
import { StoreModule } from '../store.boot'
import { UserModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [UserModule, MailerModule, StoreModule, SessionsModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
