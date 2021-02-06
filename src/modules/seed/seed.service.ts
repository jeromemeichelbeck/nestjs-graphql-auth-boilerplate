import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { UsersRepository } from '../users/users.repository'
import { UsersService } from '../users/users.service'
import { UserSeed } from './user-seed.data'

@Injectable()
export class SeedService {
    constructor(
        private readonly userSeed: UserSeed,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    async seedUsers(drop: boolean = false) {
        if (drop) await this.userService.drop({ restartIdentity: true })

        for (const user of this.userSeed.data) {
            await this.authService.register(user)
        }

        return true
    }
}
