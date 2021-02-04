import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { LoginInfoInput } from './input-types/login-info.input'
import { RegisterInfoInput } from './input-types/register-info.input'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async register(
        @Context('req') req: Request,
        @Args('registerInfo') registerInfo: RegisterInfoInput,
    ): Promise<User> {
        const user = await this.authService.register(registerInfo)

        ;(req.session as any).userId = user.id

        return user
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Context('req') req: Request,
        @Args('loginInfo') loginInfo: LoginInfoInput,
    ): Promise<User | null> {
        const user = await this.authService.validateLogin(loginInfo)

        if (user) (req.session as any).userId = user.id

        return user
    }
}
