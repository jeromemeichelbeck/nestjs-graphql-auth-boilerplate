import { Injectable } from '@nestjs/common'
import { ErrorCodeEnum } from '../../types/error-codes'
import { DUPLICATE_KEY_REGEX } from '../common/constants'
import { FieldError } from '../common/object-types/field-error.model'
import { StringFormatProvider } from './string-format.provider'

@Injectable()
export class ErrorHandlerProvider<T> {
    constructor(private readonly stringFormat: StringFormatProvider) {}

    async dbErrorHandler(fn: () => Promise<T>): Promise<T | FieldError<T>> {
        const defaultError = {
            code: ErrorCodeEnum.UNKNOWN,
            message: 'An unknown error has occured',
            fields: [],
        }

        try {
            return await fn()
        } catch (error) {
            if (!error.code) return defaultError

            switch (error.code) {
                case '23505':
                    const [_, key, value] = error.detail.match(
                        DUPLICATE_KEY_REGEX,
                    )
                    return {
                        code: ErrorCodeEnum.DUPLICATE_KEY,
                        message: `${this.stringFormat.capitalize(
                            key,
                        )} '${value}' is already registered`,
                        fields: [key],
                    }
                default:
                    return defaultError
            }
        }
    }
}
