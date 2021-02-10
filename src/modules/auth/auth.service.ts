import { Injectable } from '@nestjs/common'
import { MySession } from '../../decorators/sess.decorator'
import { ErrorCodeEnum } from '../../types/error-codes'
import { RedisPrefixEnum } from '../../types/redis'
import { RoleEnum } from '../../types/roles'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { SessionsService } from '../sessions/sessions.service'
import { StoreService } from '../store/store.service'
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
        private readonly storeService: StoreService,
        private readonly sessionsService: SessionsService,
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
            if (!user.active) {
                throw new CaughtGraphQLError([
                    {
                        code: ErrorCodeEnum.INACTIVE,
                        message: 'Inactive account',
                        fields: [],
                    },
                ])
            }

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

    async confirmEmail(token: string): Promise<User> {
        const userId = await this.tokenProvider.validateToken(
            RedisPrefixEnum.CONFIRM_EMAIL,
            token,
        )

        if (!userId || isNaN(+userId))
            throw new CaughtGraphQLError([
                {
                    code: ErrorCodeEnum.NOT_FOUND,
                    message: `Cannot confirm the user`,
                },
            ])

        const user = await this.usersService.findOneById(userId)

        await this.usersService.activate(user)

        return user
    }

    async storeSession(
        user: User,
        session: MySession,
        userAgent: string,
        ip: string,
    ): Promise<void> {
        session.userId = user.id
        session.userRoles = user.roles
        await this.sessionsService.storeSession(
            user.id,
            session.id,
            userAgent,
            ip,
        )
    }

    async wipeSession(userId: number): Promise<void> {
        const store = this.storeService.getStore()

        const userSessions = await this.sessionsService.getSessionsByUserId(
            userId,
        )

        for (const { sessionId } of userSessions) {
            store.destroy(sessionId)
        }

        await this.sessionsService.wipeSession(userId)
    }

    async logout(session: MySession): Promise<void> {
        return new Promise((resolve) => {
            session.destroy(async (error) => {
                if (error) {
                    throw new CaughtGraphQLError([
                        {
                            code: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
                            message: 'An error occured while logging out',
                            fields: [],
                        },
                    ])
                }
                await this.sessionsService.clearSessionById(session.id)
                resolve()
            })
        })
    }

    checkRoles(userRoles: RoleEnum[], requiredRoles: RoleEnum[]): boolean {
        return requiredRoles.some(
            (requiredRole) => userRoles.indexOf(requiredRole) > -1,
        )
    }
}
