import { Repository } from 'typeorm'

export interface DropOptions {
    restartIdentity?: boolean
}

export class BaseRepository<T> extends Repository<T> {
    async drop(options?: DropOptions) {
        const table = this.metadata.name.toLowerCase()
        await this.query(
            `TRUNCATE "${table}"${
                options?.restartIdentity ? ' RESTART IDENTITY' : ''
            } CASCADE;`,
        )
    }
}
