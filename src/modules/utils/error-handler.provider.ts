import { Injectable } from '@nestjs/common'
import { ErrorCodeEnum } from '../../types/error-codes'
import { CaughtGraphQLError } from '../common/classes/caught-grapghql-error.class'
import { DUPLICATE_KEY_REGEX } from '../common/constants'
import { StringFormatProvider } from './string-format.provider'

@Injectable()
export class ErrorHandlerProvider<T> {
    constructor(private readonly stringFormat: StringFormatProvider) {}

    async dbErrorHandler(fn: () => Promise<T>): Promise<T> {
        const defaultError = {
            code: ErrorCodeEnum.DB_ERROR,
            message: 'An unknown databade error has occured',
            fields: [],
        }

        try {
            return await fn()
        } catch (error) {
            if (!error.code) {
                console.log(error)
                throw new CaughtGraphQLError([defaultError])
            }

            switch (error.code) {
                case '23505':
                    const [_, key, value] = error.detail.match(
                        DUPLICATE_KEY_REGEX,
                    )
                    const message = `${this.stringFormat.capitalize(
                        key,
                    )} '${value}' is already registered`

                    throw new CaughtGraphQLError([
                        {
                            code: ErrorCodeEnum.DUPLICATE_KEY,
                            message,
                            fields: [key],
                        },
                    ])
                default:
                    console.log(error)
                    throw new CaughtGraphQLError([defaultError])
            }
        }
    }
}
