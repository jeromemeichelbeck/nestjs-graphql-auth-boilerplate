import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { IsDevGuard } from '../../guards/is-dev.guard'
import { SeedService } from './seed.service'

@Resolver()
@UseGuards(IsDevGuard)
export class SeedResolver {
    constructor(private readonly seedService: SeedService) {}

    @Mutation(() => Boolean)
    async seedUsers(
        @Args('drop', { nullable: true }) drop: boolean = false,
    ): Promise<boolean> {
        return this.seedService.seedUsers(drop)
    }
}
