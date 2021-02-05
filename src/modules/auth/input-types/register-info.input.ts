import { InputType } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'
import { ErrorCodeEnum } from '../../../types/error-codes'

@InputType()
export class RegisterInfoInput {
    @IsEmail(
        {},
        {
            message: 'Invalid email',
            context: { code: ErrorCodeEnum.INVALID_EMAIL },
        },
    )
    email!: string

    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
        context: { code: ErrorCodeEnum.INVALID_PASSWORD },
    })
    password!: string

    @MinLength(2, {
        message: 'Username must be at least 2 characters long',
        context: { code: ErrorCodeEnum.INVALID_USERNAME },
    })
    username!: string
}
