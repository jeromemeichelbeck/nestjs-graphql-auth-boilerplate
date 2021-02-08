import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../users/users.module'
import { SeedResolver } from './seed.resolver'
import { SeedService } from './seed.service'
import { UserSeed } from './user-seed.data'

export interface SeedModuleOptions {
    production: boolean
}

export interface SeedModuleAsyncOptions {
    imports: Array<Type<any> | string | any>
    useFactory: (...args: any[]) => SeedModuleOptions
}

@Module({})
export class SeedCoreModule {
    public static forRootAsync({
        imports,
        useFactory,
    }: SeedModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [SeedService, UserSeed]
        const { production } = useFactory()

        if (!production) providers.push(SeedResolver)

        return {
            module: SeedCoreModule,
            imports,
            providers,
        }
    }
}
