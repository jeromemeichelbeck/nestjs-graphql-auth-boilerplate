import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FieldError } from '../common/object-types/field-error.model'
import { RoleEnum } from '../../types/roles'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'
import { ErrorCodeEnum } from '../../types/error-codes'

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

    async register(
        registerInfo: RegisterInfoInput,
    ): Promise<User | FieldError<User>> {
        const user = this.userRepository.create(registerInfo)

        try {
            await this.userRepository.save(user)
        } catch (error) {
            switch (error.code) {
                case '23505':
                    console.log(error.detail)
                    return {
                        code: ErrorCodeEnum.DUPLICATE_KEY,
                        message: 'This email address in already registered',
                        fields: ['email'],
                    }
            }
        }

        return user
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({})
    }
}
