import { EntityRepository } from 'typeorm'
import { BaseRepository } from '../common/base.repository'
import { Session } from './session.entity'

@EntityRepository(Session)
export class SessionsRepository extends BaseRepository<Session> {}
