import { InputType } from '@nestjs/graphql'

@InputType()
export class LoginInfoInput {
    email!: string

    password!: string
}
