import { ObjectType, Field } from '@nestjs/graphql'
import { ErrorCodeEnum } from '../../../types/error-codes'

@ObjectType()
export class FieldError<T> {
    code!: ErrorCodeEnum

    message!: string

    @Field(() => [String])
    fields!: (keyof T)[]
}
