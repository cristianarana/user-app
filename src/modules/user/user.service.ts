import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { CreateUserOutput } from './dto/create-user.output';
import { validate } from 'class-validator';
import { UpdateUserInput } from './dto/update-user.input';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userServiceRepository: Repository<User>
    ){}

    async createUser ( entity: CreateUserInput): Promise<CreateUserOutput>{
        const json = JSON.parse(JSON.stringify(entity));
        const obj = this.userServiceRepository.create(json);
        
        await this.validateEntity(obj);

        try{
            return await this.saveEntity(obj)
        }catch (err){
            Logger.error(err);
            throw new BadRequestException(err);
        }

    }

    async deleteUser(id: number): Promise<void>{
        await this.userServiceRepository.delete(id);
    }

    async findAll():Promise<User[]>{
        return this.userServiceRepository.find();
    }

    async findOne(id: number): Promise<User>{
        return this.userServiceRepository.findOneBy({id});
    }

    async findByEmail(email:string ): Promise<User[]>{
        return this.userServiceRepository.find({
            where:{
                email: email
            }
        });
    }

    async updateUser(id:number, user:UpdateUserInput): Promise<User>{
        await this.userServiceRepository.update(id,user);
        return this.findOne(id);
    }

    private async saveEntity(entity: any): Promise<CreateUserOutput>{
        return await this.userServiceRepository.save(entity);
    }

    private async validateEntity(entity: any): Promise<void>{
        const errors = await validate(entity);
        if (errors && errors.length > 0){
            throw new BadRequestException(errors);
        }
    }
}

