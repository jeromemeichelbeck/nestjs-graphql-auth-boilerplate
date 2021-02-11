import { Injectable } from '@nestjs/common'
import { MySession } from '../../decorators/sess.decorator'
import { ErrorCodeEnum } from '../../types/error-codes'
import { MailTypeEnum } from '../../types/mails'
import { RoleEnum } from '../../types/roles'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { SessionsService } from '../sessions/sessions.service'
import { StoreService } from '../store/store.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { BcryptProvider } from '../utils/bcrypt.provider'
import { MailProvider } from '../utils/mail.provider'
import { TokenProvider } from '../utils/token.provider'
import { ChangePasswordInfoInput } from './input-types/change-password-info.input'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly bycryptProvider: BcryptProvider,
        private readonly tokenProvider: TokenProvider,
        private readonly mailProvider: MailProvider,
        private readonly storeService: StoreService,
        private readonly sessionsService: SessionsService,
    ) {}

    async register(registerInfo: RegisterInfoInput): Promise<User> {
        const { password } = registerInfo
        registerInfo.password = await this.bycryptProvider.hash(password)

        const user = await this.usersService.register(registerInfo)

        await this.sendLink(MailTypeEnum.CONFIRM_EMAIL, user)

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
            MailTypeEnum.CONFIRM_EMAIL,
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

    async forgotPassword(email: string): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email)
        if (user) {
            const link = await this.tokenProvider.generateLink(
                MailTypeEnum.CHANGE_PASSWORD,
                user.id,
            )

            await this.sendLink(MailTypeEnum.CHANGE_PASSWORD, user)
        }

        return true
    }

    async changePassword({
        token,
        password,
        hard,
    }: ChangePasswordInfoInput): Promise<User> {
        const userId = await this.tokenProvider.validateToken(
            MailTypeEnum.CHANGE_PASSWORD,
            token,
        )

        if (!userId || isNaN(+userId))
            throw new CaughtGraphQLError([
                {
                    code: ErrorCodeEnum.NOT_FOUND,
                    message: `Cannot change password the user`,
                },
            ])

        const user = await this.usersService.findOneById(userId)
        user.password = await this.bycryptProvider.hash(password)

        await this.usersService.update(user)

        if (hard) await this.wipeSession(user.id)

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
        return requiredRoles.some((requiredRole) =>
            userRoles.includes(requiredRole),
        )
    }

    async sendLink(type: MailTypeEnum, user: User) {
        if (user.email.includes('@example.com')) return
        const link = await this.tokenProvider.generateLink(
            MailTypeEnum.CONFIRM_EMAIL,
            user.id,
        )

        let subject
        switch (type) {
            case MailTypeEnum.CONFIRM_EMAIL:
                subject = `Welcome`
                break
            case MailTypeEnum.CHANGE_PASSWORD:
                subject = `Changing your password`
                break
        }

        await this.mailProvider.sendMail({
            to: user.email,
            subject,
            template: type,
            context: {
                user,
                link,
            },
        })
    }
}
