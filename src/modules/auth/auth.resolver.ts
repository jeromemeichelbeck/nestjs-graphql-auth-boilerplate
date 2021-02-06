import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { Res } from '../../decorators/res.decorator'
import { MySession, Session } from '../../decorators/session.decorator'
import { GraphQLValidationPipe } from '../../pipes/graphql-validation.pipe'
import { ErrorCodeEnum } from '../../types/error-codes'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'
@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async register(
        @Session() session: MySession,
        @Args('registerInfo', GraphQLValidationPipe)
        registerInfo: RegisterInfoInput,
    ): Promise<User> {
        const user = await this.authService.register(registerInfo)
        session.userId = user.id

        return user
    }

    @Mutation(() => User)
    async login(
        @Session() session: MySession,
        @Args('loginInfo') loginInfo: LoginInfoInput,
    ): Promise<User> {
        const user = await this.authService.validateLogin(loginInfo)

        session.userId = user.id

        return user
    }

    @Mutation(() => Boolean)
    async logout(
        @Session() session: MySession,
        @Res() res: Response,
        @Args('hard', { nullable: true }) hard: boolean = false,
    ): Promise<boolean> {
        return new Promise((resolve) => {
            session.destroy((error) => {
                if (error) {
                    throw new CaughtGraphQLError([
                        {
                            code: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
                            message: 'An error occured while logging out',
                            fields: [],
                        },
                    ])
                }
                if (hard) {
                    res.clearCookie(process.env.SESS_NAME)
                }

                resolve(true)
            })
        })
    }
}
