import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config.boot'
import { GraphQlModule } from './graphql.boot'
import { MailerModule } from './mailer.boot'
import { RedisModule } from './redis.boot'
import { SeedModule } from './seed.boot'
import { SessionModule } from './session.boot'
import { StoreModule } from './store.boot'
import { TypeOrmModule } from './typeorm.boot'
import { UserModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        RedisModule,
        StoreModule,
        SessionModule,
        MailerModule,
        GraphQlModule,
        AuthModule,
        UserModule,
        SeedModule,
    ],
})
export class AppModule {}
