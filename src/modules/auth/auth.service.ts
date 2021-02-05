import { Injectable } from '@nestjs/common'
import { FieldError } from '../common/object-types/field-error.model'
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

    async register(
        registerInfo: RegisterInfoInput,
    ): Promise<User | FieldError<User>> {
        const { password } = registerInfo
        registerInfo.password = await this.bycryptProvider.hash(password)

        return this.usersService.register(registerInfo)
    }

    async validateLogin(loginInfo: LoginInfoInput): Promise<User | null> {
        const { email, password } = loginInfo

        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            const isValidPassword = await this.bycryptProvider.verify(
                password,
                user.password,
            )
            if (isValidPassword) return user
        }

        return null
    }
}
