import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}


    async validate (email: string, password: string): Promise<User>{
        const user = this.userService.findByEmail(email);

        if (!user){
            return null;
        }

        const passwordIsValid = password === user[0].password;
        return passwordIsValid?  user[0]:null;
    }

    async login(user:User): Promise<String>{
        const payload = {
            email: user.email,
            sub: user.id,
        }   
        const access_token= this.jwtService.sign(payload);
        return access_token
    }

    async verify(token: string): Promise<User[]>{
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        });

        const user = this.userService.findByEmail(decoded.email);
        if (!user){
            throw new Error('No existe el usuario.');
        }

        return user;
    }
}
