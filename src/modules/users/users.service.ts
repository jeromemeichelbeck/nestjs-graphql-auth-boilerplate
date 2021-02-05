import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RolesEnum } from '../../types/roles'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
    ) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email })
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne(id)
    }

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const user = this.userRepository.create(registerInfo)
        await this.userRepository.save(user)

        return user
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({})
    }
}
