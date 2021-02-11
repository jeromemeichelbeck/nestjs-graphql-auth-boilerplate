import { Injectable } from '@nestjs/common'
import { RoleEnum } from '../../types/roles'
import { AuthService } from '../auth/auth.service'
import { UsersService } from '../users/users.service'
import { UserSeed } from './user-seed'

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
            const registeredUser = await this.authService.register(user)

            if (registeredUser.email.includes('active')) {
                await this.userService.activate(registeredUser)
            }

            if (registeredUser.email.includes('admin')) {
                await this.userService.addRoles({
                    userId: registeredUser.id,
                    roles: [RoleEnum.ADMIN],
                })
            }
        }

        return true
    }
}
