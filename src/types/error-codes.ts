import { registerEnumType } from '@nestjs/graphql'

export enum ErrorCodeEnum {
    UNKNOWN = 'UNKNOWN',
    DB_ERROR = 'DB_ERROR',
    DUPLICATE_KEY = 'DUPLICATE_KEY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    INVALID_USERNAME = 'INVALID_USERNAME',
}

registerEnumType(ErrorCodeEnum, { name: 'ErrorcodeEnum' })
