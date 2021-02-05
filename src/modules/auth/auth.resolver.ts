import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { MySession, Session } from '../../decorators/session.decorator'
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
        @Args('registerInfo') registerInfo: RegisterInfoInput,
    ): Promise<User> {
        const user = await this.authService.register(registerInfo)
        session.userId = user.id

        return user
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Session() session: MySession,
        @Args('loginInfo') loginInfo: LoginInfoInput,
    ): Promise<User | null> {
        const user = await this.authService.validateLogin(loginInfo)

        if (user) session.userId = user.id

        return user
    }
}
