import { Injectable } from '@nestjs/common'
import { ErrorCodeEnum } from '../../types/error-codes'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { BcryptProvider } from '../utils/bcrypt.provider'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly bycryptProvider: BcryptProvider,
    ) {}

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const { password } = registerInfo
        registerInfo.password = await this.bycryptProvider.hash(password)

        return this.usersService.register(registerInfo)
    }

    async validateLogin(loginInfo: LoginInfoInput): Promise<User> {
        const { email, password } = loginInfo

        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            const isValidPassword = await this.bycryptProvider.verify(
                password,
                user.password,
            )
            if (isValidPassword) return user
        }

        throw new CaughtGraphQLError([
            {
                code: ErrorCodeEnum.UNAUTHORIZED,
                message: 'Invalid credentials',
                fields: ['email', 'password'],
            },
        ])
    }
}
