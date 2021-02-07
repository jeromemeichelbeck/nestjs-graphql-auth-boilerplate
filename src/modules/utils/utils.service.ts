import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilsService {
    async sleep(time: number = 500): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, time))
    }
}
