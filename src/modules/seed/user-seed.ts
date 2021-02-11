import { Injectable } from '@nestjs/common'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'

@Injectable()
export class UserSeed {
    data: RegisterInfoInput[] = [
        {
            email: 'activeadmin@example.com',
            password: 'azerty',
            username: 'Active Admin',
        },
        {
            email: 'admin@example.com',
            password: 'azerty',
            username: 'Not Active Admin',
        },
        {
            email: 'activeuser@example.com',
            password: 'azerty',
            username: 'Active User',
        },
        {
            email: 'user@example.com',
            password: 'azerty',
            username: 'Not Active User',
        },
    ]
}
