import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import {
    CaughtError,
    CaughtGraphQLError,
} from '../modules/common/classes/caught-grapghql-error.class'

@Injectable()
export class GraphQLValidationPipe implements PipeTransform {
    async transform(
        value: any,
        metaData: ArgumentMetadata,
    ): Promise<typeof value> {
        const obj = plainToClass(metaData.metatype!, value)
        const errors = await validate(obj)

        const caughtErrors: CaughtError[] = []
        for (const { property, constraints, contexts } of errors) {
            for (const constraint in constraints) {
                caughtErrors.push({
                    code: contexts![constraint].code,
                    message: constraints[constraint],
                    fields: [property],
                })
            }
        }

        if (caughtErrors.length > 0) {
            throw new CaughtGraphQLError(caughtErrors)
        }

        return value
    }
}
