import { Injectable } from '@nestjs/common'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { LoginInfoInput } from './input-types/login-info.input'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(loginInfo: LoginInfoInput): Promise<User | null> {
        const { email, password } = loginInfo

        const user = await this.usersService.findOne(email)
        if (user && user.password === password) {
            return user
        }
        return null
    }
}
