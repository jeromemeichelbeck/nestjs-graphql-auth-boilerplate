import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Session {
    @PrimaryColumn()
    sessionId!: string

    @Column()
    userId!: number
    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
    user!: User

    @Column()
    userAgent!: string

    @Column()
    ip!: string
}
