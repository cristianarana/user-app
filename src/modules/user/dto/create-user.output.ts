import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateUserOutput{
    @Field(() => Int)
    id: number;
}