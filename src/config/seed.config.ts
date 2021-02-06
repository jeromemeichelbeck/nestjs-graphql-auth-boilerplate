import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { SeedModuleOptions } from '../modules/seed/seed.module'
import { ConfigEnum } from '../types/config'

export const dbConfig = (): { [ConfigEnum.seed]: SeedModuleOptions } => ({
    [ConfigEnum.seed]: {
        production: process.env.NODE_ENV === 'production',
    },
})
