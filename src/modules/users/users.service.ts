import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ErrorCodeEnum } from '../../types/error-codes'
import { RoleEnum } from '../../types/roles'
import { AlterRolesInfoInput } from '../admin/input-types/add-roles-info.input'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'
import { DropOptions } from '../common/base.repository'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { ArrayProvider } from '../utils/array.provider'
import { ErrorHandlerProvider } from '../utils/error-handler.provider'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly errorHandler: ErrorHandlerProvider<User>,
        private readonly arrayProvider: ArrayProvider,
    ) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email })
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id)
        if (!user)
            throw new CaughtGraphQLError([
                {
                    code: ErrorCodeEnum.NOT_FOUND,
                    message: `Cannot find user with id ${id}`,
                },
            ])

        return user
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({})
    }

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const user = this.userRepository.create(registerInfo)

        if (
            process.env.NODE_ENV === 'development' &&
            (user.email === 'jerome@meichelbeck.io' ||
                user.email === 'emilie@jolly.io')
        ) {
            user.roles = [RoleEnum.ADMIN, RoleEnum.READER]
            user.active = true
        }

        return this.errorHandler.dbErrorHandler(
            async () => await this.userRepository.save(user),
        )
    }

    async activate(user: User): Promise<void> {
        user.active = true
        await this.userRepository.save(user)
    }

    async addRoles({ userId, roles }: AlterRolesInfoInput): Promise<void> {
        const user = await this.findOneById(userId)

        user.roles = this.arrayProvider.union(user.roles, roles)

        await this.errorHandler.dbErrorHandler(() =>
            this.userRepository.save(user),
        )
    }

    async removeRoles({ userId, roles }: AlterRolesInfoInput): Promise<void> {
        const user = await this.findOneById(userId)

        user.roles = user.roles.filter((role) => !roles.includes(role))

        await this.errorHandler.dbErrorHandler(() =>
            this.userRepository.save(user),
        )
    }

    async update(user: User): Promise<void> {
        await this.errorHandler.dbErrorHandler(() =>
            this.userRepository.save(user),
        )
    }

    // Dev
    async drop(options?: DropOptions) {
        await this.userRepository.drop(options)
    }
}
