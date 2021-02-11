import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AlterRolesInfoInput } from './input-types/add-roles-info.input'

@Injectable()
export class AdminService {
    constructor(private readonly userService: UsersService) {}

    async addRoles(addRolesInfo: AlterRolesInfoInput): Promise<void> {
        await this.userService.addRoles(addRolesInfo)
    }

    async removeRoles(removeRolesInfo: AlterRolesInfoInput): Promise<void> {
        await this.userService.removeRoles(removeRolesInfo)
    }
}
