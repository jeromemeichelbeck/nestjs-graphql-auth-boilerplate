import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../users/users.module'
import { AdminResolver } from './admin.resolver'
import { AdminService } from './admin.service'

@Module({
    imports: [UserModule, AuthModule],
    providers: [AdminService, AdminResolver],
})
export class AdminModule {}
