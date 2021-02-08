import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { ConfigEnum } from '../types/config'

export const dbConfig = (): { [ConfigEnum.db]: TypeOrmModuleOptions } => ({
    [ConfigEnum.db]: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
        synchronize: process.env.NODE_ENV === 'development',
        // logging: process.env.NODE_ENV === 'development',
        // dropSchema: process.env.NODE_ENV === 'development',
    },
})
