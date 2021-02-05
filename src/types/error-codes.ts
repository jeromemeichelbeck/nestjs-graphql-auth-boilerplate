import { registerEnumType } from '@nestjs/graphql'

export enum ErrorCodeEnum {
    UNKNOWN = 'UNKNOWN',
    DUPLICATE_KEY = 'DUPLICATE_KEY',
}

registerEnumType(ErrorCodeEnum, { name: 'ErrorcodeEnum' })
