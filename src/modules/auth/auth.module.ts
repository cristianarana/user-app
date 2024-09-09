import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({ 
      secret: jwtSecret,
      signOptions: { expiresIn: '3600s' }
    })
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
