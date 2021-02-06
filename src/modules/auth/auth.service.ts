import { Injectable } from '@nestjs/common'
import { ErrorCodeEnum } from '../../types/error-codes'
import { RedisPrefixEnum } from '../../types/redis'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { BcryptProvider } from '../utils/bcrypt.provider'
import { MailerProvider } from '../utils/mailer.provider'
import { TokenProvider } from '../utils/token.provider'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly bycryptProvider: BcryptProvider,
        private readonly tokenProvider: TokenProvider,
        private readonly mailerProvider: MailerProvider,
    ) {}

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const { password } = registerInfo
        registerInfo.password = await this.bycryptProvider.hash(password)

        const user = await this.usersService.register(registerInfo)

        const link = await this.tokenProvider.generateLink(
            RedisPrefixEnum.CONFIRM_EMAIL,
            user.id,
        )

        await this.mailerProvider.sendMail({
            to: user.email,
            subject: '[MetalEast] Bienvenue !',
            template: 'welcome',
            context: {
                username: user.username,
                link,
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
