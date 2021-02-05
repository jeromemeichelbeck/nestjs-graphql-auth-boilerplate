import { Injectable } from '@nestjs/common'

@Injectable()
export class StringFormatProvider {
    capitalize(phrase: string): string {
        return `${phrase[0].toUpperCase()}${phrase.slice(1)}`
    }
}
