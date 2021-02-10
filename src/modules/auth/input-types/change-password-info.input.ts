import { InputType } from '@nestjs/graphql'
import { MinLength } from 'class-validator'
import { ErrorCodeEnum } from '../../../types/error-codes'

@InputType()
export class ChangePasswordInfoInput {
    token!: string

    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
        context: { code: ErrorCodeEnum.INVALID_PASSWORD },
    })
    password!: string

    hard?: boolean
}
