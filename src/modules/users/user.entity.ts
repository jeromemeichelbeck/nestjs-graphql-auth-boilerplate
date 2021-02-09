import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEnum } from '../../types/roles'
import { Session } from '../sessions/session.entity'

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number

    @Column({ default: false })
    @HideField()
    active!: boolean

    @OneToMany(() => Session, (session) => session.user)
    @HideField()
    sessions!: Session[]

    @Column({
        type: 'enum',
        array: true,
        enum: RoleEnum,
        default: [RoleEnum.READER],
    })
    @HideField()
    roles!: RoleEnum[]

    @Column({ unique: true })
    email!: string

    @Column()
    @HideField()
    password!: string

    @Column()
    username!: string
}
