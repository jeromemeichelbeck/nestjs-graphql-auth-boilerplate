import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserInput } from './input-types/create-user.input'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email })
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(createUserInput)

        await this.userRepository.save(user)

        return user
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({})
    }
}
