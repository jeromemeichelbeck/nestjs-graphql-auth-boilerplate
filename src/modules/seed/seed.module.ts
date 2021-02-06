import { DynamicModule, Module, Provider, Type } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
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
export class SeedModule {
    public static forRootAsync({
        imports,
        useFactory,
    }: SeedModuleAsyncOptions): DynamicModule {
        const providers: Provider[] = [SeedService, UserSeed]
        const { production } = useFactory()

        if (!production) providers.push(SeedResolver)

        return {
            module: SeedModule,
            imports,
            providers,
        }
    }
}
