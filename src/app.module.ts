import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './users/users.module'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'jerome',
                password: 'password',
                database: 'metaleast',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
        }),
        GraphQLModule.forRootAsync({
            useFactory: () => ({
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
            }),
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
