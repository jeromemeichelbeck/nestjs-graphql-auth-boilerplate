import { Injectable } from '@nestjs/common'
import { ErrorCodeEnum } from '../../types/error-codes'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { BcryptProvider } from '../utils/bcrypt.provider'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly bycryptProvider: BcryptProvider,
        private readonly mailerService: MailerService,
    ) {}

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const { password } = registerInfo
        registerInfo.password = await this.bycryptProvider.hash(password)

        const user = await this.usersService.register(registerInfo)

        await this.mailerService.sendMail({
            to: 'jeromesnail@hotmail.fr',
            subject: 'Register bla bla bla',
            template: 'test',
            context: {
                test: 'prout',
            },
        })

        return user
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
