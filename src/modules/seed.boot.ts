import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { SeedCoreModule } from './seed/seed.module'
import { UserModule } from './users/users.module'

export const SeedModule = SeedCoreModule.forRootAsync({
    imports: [ConfigModule, AuthModule, UserModule],
    useFactory: () => ({
        production: process.env.NODE_ENV === 'production',
    }),
})
