import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
    email!: string

    password!: string

    username!: string
}
