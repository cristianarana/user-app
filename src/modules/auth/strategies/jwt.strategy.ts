import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/modules/user/entities/user.entity";
import { jwtSecret } from "../constants";
import { UserService } from "src/modules/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor (private readonly userService: UserService){
        super({ 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        })
    }

    async validate(validationPayload:{email:string, password:string}):Promise<User[]>{
        return this.userService.findByEmail(validationPayload.email);
    } 
}