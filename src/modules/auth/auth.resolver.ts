import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { Ip } from '../../decorators/ip.decorator'
import { Res } from '../../decorators/res.decorator'
import { MySession, Sess } from '../../decorators/sess.decorator'
import { UserAgent } from '../../decorators/user-agent.decorator'
import { GraphQLValidationPipe } from '../../pipes/graphql-validation.pipe'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'
@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async register(
        @Args('registerInfo', GraphQLValidationPipe)
        registerInfo: RegisterInfoInput,
    ): Promise<User> {
        return await this.authService.register(registerInfo)
    }

    @Mutation(() => User)
    async login(
        @Sess() session: MySession,
        @UserAgent() userAgent: string,
        @Ip() ip: string,
        @Args('loginInfo') loginInfo: LoginInfoInput,
    ): Promise<User> {
        const user = await this.authService.validateLogin(loginInfo)

        session.userId = user.id
        await this.authService.storeSession(user, session, userAgent, ip)

        return user
    }

    @Mutation(() => Boolean)
    async logout(
        @Sess() session: MySession,
        @Res() res: Response,
        @Args('hard', { nullable: true }) hard: boolean = false,
    ): Promise<boolean> {
        const { userId } = session

        await this.authService.logout(session)
        res.clearCookie(process.env.SESS_NAME)

        if (hard) {
            await this.authService.wipeSession(userId)
        }

        return true
    }

    @Mutation(() => Boolean)
    async confirmEmail(
        @Sess() session: MySession,
        @UserAgent() userAgent: string,
        @Ip() ip: string,
        @Args('token') token: string,
    ): Promise<boolean> {
        const user = await this.authService.confirmEmail(token)

        if (!user) return false

        await this.authService.storeSession(user, session, userAgent, ip)

        return true
    }
}
