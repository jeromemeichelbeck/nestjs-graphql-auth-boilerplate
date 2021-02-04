import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number

    @Column({ unique: true })
    email!: string

    @Column()
    @HideField()
    password!: string

    @Column()
    username!: string
}
