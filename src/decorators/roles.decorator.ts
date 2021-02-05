import { SetMetadata } from '@nestjs/common'
import { ROLES, RoleEnum } from '../types/roles'

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES, roles)
