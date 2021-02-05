import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { RolesEnum } from '../../types/roles'

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number

    @Column({
        type: 'enum',
        array: true,
        enum: RolesEnum,
        default: [RolesEnum.admin],
    })
    @HideField()
    roles!: RolesEnum[]

    @Column({ unique: true })
    email!: string

    @Column()
    @HideField()
    password!: string

    @Column()
    username!: string

    hasRole(roles: RolesEnum[]): boolean {
        console.log(this.roles)
        console.log(roles)
        return this.roles.some((role) => roles.indexOf(role) > -1)
    }
}
