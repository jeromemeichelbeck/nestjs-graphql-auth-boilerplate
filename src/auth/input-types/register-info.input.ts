import { InputType } from '@nestjs/graphql'
import { LoginInfoInput } from './login-info.input'

@InputType()
export class RegisterInfoInput extends LoginInfoInput {
    username!: string
}
