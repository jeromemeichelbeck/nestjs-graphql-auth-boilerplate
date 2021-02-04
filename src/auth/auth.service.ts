import { Injectable } from '@nestjs/common'
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

    async validateLogin(loginInfo: LoginInfoInput): Promise<User | null> {
        const { email, password } = loginInfo

        const user = await this.usersService.findOne(email)
        if (user && user.password === password) {
            return user
        }
        return null
    }
}
