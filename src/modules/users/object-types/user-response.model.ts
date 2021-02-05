import { ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../common/object-types/base-response.model'
import { User } from '../user.entity'

@ObjectType()
export class UserResponse extends BaseResponse<User> {
    user?: User
}
