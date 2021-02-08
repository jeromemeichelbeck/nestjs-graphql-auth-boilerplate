import {
    TypeOrmModule as TypeOrmCoreModule,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../types/config'
import { DynamicModule } from '@nestjs/common'

export const TypeOrmModule: DynamicModule = TypeOrmCoreModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (cs: ConfigService) =>
        cs.get<TypeOrmModuleOptions>(ConfigEnum.db)!,
})
