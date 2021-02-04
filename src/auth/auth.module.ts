import { Module } from '@nestjs/common'
import { UserModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [UserModule],
    providers: [AuthService, AuthResolver],
})
export class AuthModule {}
