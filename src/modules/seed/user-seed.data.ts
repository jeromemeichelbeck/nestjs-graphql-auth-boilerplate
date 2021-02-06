import { Injectable } from '@nestjs/common'
import { RegisterInfoInput } from '../auth/input-types/register-info.input'

@Injectable()
export class UserSeed {
    data: RegisterInfoInput[] = [
        {
            email: 'jerome@meichelbeck.io',
            password: 'azerty',
            username: 'Jérôme Meichelbeck',
        },
        {
            email: 'emilie@jolly.io',
            password: 'azerty',
            username: 'Emilie Jolly',
        },
        {
            email: 'lea@jolly.io',
            password: 'azerty',
            username: 'Léa Jolly',
        },
        {
            email: 'sylvie@meichelbeck.io',
            password: 'azerty',
            username: 'Sylvie Meichelbeck',
        },
    ]
}
