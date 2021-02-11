import { Injectable } from '@nestjs/common'

@Injectable()
export class ArrayProvider {
    union<T>(...arrays: T[][]): T[] {
        let returnArray: T[] = []

        for (const array of arrays) {
            for (const item of array) {
                if (!returnArray.includes(item)) returnArray.push(item)
            }
        }

        return returnArray
    }
}
