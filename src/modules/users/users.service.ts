import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'
import { ErrorHandlerProvider } from '../utils/error-handler.provider'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly errorHandler: ErrorHandlerProvider<User>,
    ) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email })
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne(id)
    }

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const user = this.userRepository.create(registerInfo)

        return this.errorHandler.dbErrorHandler(
            async () => await this.userRepository.save(user),
        )
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({})
    }
}
