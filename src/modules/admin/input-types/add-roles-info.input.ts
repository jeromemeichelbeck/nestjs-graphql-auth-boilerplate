import { Field, InputType, Int } from '@nestjs/graphql'
import { ArrayNotEmpty } from 'class-validator'
import { RoleEnum } from '../../../types/roles'

@InputType()
export class AlterRolesInfoInput {
    @Field(() => Int)
    userId!: number

    @Field(() => [RoleEnum])
    @ArrayNotEmpty()
    roles!: RoleEnum[]
}
