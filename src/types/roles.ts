import { registerEnumType } from '@nestjs/graphql'

export const ROLES = 'ROLES'

export enum RoleEnum {
    ADMIN = 'ADMIN',
    READER = 'READER',
}

registerEnumType(RoleEnum, { name: 'RoleEnum' })
