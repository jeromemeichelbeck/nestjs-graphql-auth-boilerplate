import { forwardRef, Module } from '@nestjs/common'
import { UserModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { UtilsModule } from '../utils/utils.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [UserModule, UtilsModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
