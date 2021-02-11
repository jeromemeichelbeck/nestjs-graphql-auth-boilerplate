import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DevGuard } from '../../guards/dev.guard'
import { SeedService } from './seed.service'

@Resolver()
@UseGuards(DevGuard)
export class SeedResolver {
    constructor(private readonly seedService: SeedService) {}

    @Mutation(() => Boolean)
    async seedUsers(
        @Args('drop', { nullable: true }) drop: boolean = false,
    ): Promise<boolean> {
        return this.seedService.seedUsers(drop)
    }
}
