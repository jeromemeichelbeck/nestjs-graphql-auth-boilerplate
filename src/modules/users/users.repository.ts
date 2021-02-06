import { EntityRepository } from 'typeorm'
import { BaseRepository } from '../common/base.repository'
import { User } from './user.entity'

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {}
