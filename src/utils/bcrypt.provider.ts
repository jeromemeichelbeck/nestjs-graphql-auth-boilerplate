import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider {
    async hash(toHash: string, salt = 12): Promise<string> {
        return await bcrypt.hash(toHash, salt)
    }

    async verify(toCompare: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(toCompare, hashed)
    }
}
