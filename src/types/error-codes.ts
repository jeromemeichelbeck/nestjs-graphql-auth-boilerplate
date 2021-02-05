import { registerEnumType } from '@nestjs/graphql'

export enum ErrorCodeEnum {
    DUPLICATE_KEY = 'DUPLICATE_KEY',
}

registerEnumType(ErrorCodeEnum, { name: 'ErrorcodeEnum' })
