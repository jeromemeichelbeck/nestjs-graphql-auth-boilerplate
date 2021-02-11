import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorators/roles.decorator'
import { RolesGuard } from '../../guards/role.guards'
import { GraphQLValidationPipe } from '../../pipes/graphql-validation.pipe'
import { RoleEnum } from '../../types/roles'
import { AdminService } from './admin.service'
import { AlterRolesInfoInput } from './input-types/add-roles-info.input'

@Resolver()
export class AdminResolver {
    constructor(private readonly adminService: AdminService) {}

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Boolean)
    async addRoles(
        @Args('addRolesInfo', GraphQLValidationPipe)
        addRolesInfo: AlterRolesInfoInput,
    ): Promise<boolean> {
        await this.adminService.addRoles(addRolesInfo)
        return true
    }

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Boolean)
    async removeRoles(
        @Args('removeRolesInfo', GraphQLValidationPipe)
        removeRolesInfo: AlterRolesInfoInput,
    ): Promise<boolean> {
        await this.adminService.removeRoles(removeRolesInfo)
        return true
    }
}
