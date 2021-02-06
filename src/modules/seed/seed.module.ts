import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UserModule } from '../users/users.module'
import { SeedResolver } from './seed.resolver'
import { SeedService } from './seed.service'
import { UserSeed } from './user-seed.data'

@Module({
    imports: [AuthModule, UserModule],
    providers: [SeedService, UserSeed, SeedResolver],
    exports: [],
})
export class SeedModule {}
