import { Field, ObjectType } from '@nestjs/graphql'
import { FieldError } from './field-error.model'

@ObjectType()
export class BaseResponse<T> {
    @Field(() => [FieldError])
    errors?: FieldError<T>[]
}
