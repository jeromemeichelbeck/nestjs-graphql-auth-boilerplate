import { Injectable } from '@nestjs/common'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'

@Injectable()
export class UserSeed {
    data: RegisterInfoInput[] = [
        {
            email: 'admin@example.com',
            password: 'azerty',
            username: 'Admin',
        },
        {
            email: 'admin2@example.com',
            password: 'azerty',
            username: 'Admin Too',
        },
        {
            email: 'notanadmin@example.com',
            password: 'azerty',
            username: 'Not An Admin',
        },
    ]
}
