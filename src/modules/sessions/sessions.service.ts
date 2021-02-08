import { Injectable } from '@nestjs/common'
import { Session } from './session.entity'
import { SessionsRepository } from './sessions.repository'

@Injectable()
export class SessionsService {
    constructor(private readonly sessionsRepository: SessionsRepository) {}

    async getSessionsByUserId(userId: number): Promise<Session[]> {
        return await this.sessionsRepository.find({ userId })
    }

    async storeSession(
        userId: number,
        sessionId: string,
        userAgent: string,
        ip: string,
    ) {
        const session = this.sessionsRepository.create({
            userId,
            sessionId,
            userAgent,
            ip,
        })
        await this.sessionsRepository.save(session)
    }

    async wipeSession(userId: number): Promise<void> {
        await this.sessionsRepository.delete({ userId })
    }

    async clearSessionById(sessionId: string): Promise<void> {
        await this.sessionsRepository.delete({ sessionId })
    }
}
