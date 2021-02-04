import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Request } from 'express'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { LoginInfoInput } from './input-types/login-info.input'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User, { nullable: true })
    async login(
        @Context('req') req: Request,
        @Args('loginInfo') loginInfo: LoginInfoInput,
    ): Promise<User | null> {
        const user = await this.authService.validateUser(loginInfo)

        if (user) (req.session as any).userId = user.id

        return user
    }
}
