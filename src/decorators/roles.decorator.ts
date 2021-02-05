import { SetMetadata } from '@nestjs/common'
import { ROLES, RolesEnum } from '../types/roles'

export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES, roles)
