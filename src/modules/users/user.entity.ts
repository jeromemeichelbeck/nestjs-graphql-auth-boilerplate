import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEnum } from '../../types/roles'

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number

    @Column({ default: false })
    @HideField()
    active!: boolean

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

    hasRole(roles: RoleEnum[]): boolean {
        return this.roles.some((role) => roles.indexOf(role) > -1)
    }
}
