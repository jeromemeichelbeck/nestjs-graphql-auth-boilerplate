import { InputType } from '@nestjs/graphql'

@InputType()
export class ChangePasswordInfoInput {
    token!: string

    password!: string

    hard?: boolean
}
