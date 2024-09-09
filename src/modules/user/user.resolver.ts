import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserOutput } from './dto/create-user.output';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //#region Querys
  @Query(returns => [User])
  async findAll():Promise<User[]>{
   return this.userService.findAll();
  }

  @Query(returns => User)
  async findOne(id:number):Promise<User>{
    return this.userService.findOne(id);
  }

  @Query(returns => User)
  async findByEmail(email:string):Promise<User[]>{
    return this.userService.findByEmail(email);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  //#endregion

  //#region Mutations
  @Mutation(returns => CreateUserOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<CreateUserOutput>{
    return this.userService.createUser(createUserInput);
  }

  @Mutation()
  async deleteUser(@Args('id') userId:number):Promise<boolean>{
    await this.userService.deleteUser(userId);
    return true;
  }

  @Mutation(returns => User)
  async updateUser(@Args('id') userId:number, @Args('updateUserInput') updateUserInput:UpdateUserInput):Promise<User>{
    return this.userService.updateUser(userId, updateUserInput);
  }
  //#enregion
}
