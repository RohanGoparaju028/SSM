import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUP } from './signup.controller';
import { SignupServices } from './signup.services';
import { PrismaService } from './prisma.service';
import { LoginController } from './login.controller';
import { LoginServices } from './login.services';

@Module({
  imports: [],
  controllers: [AppController, SignUP, LoginController],
  providers: [AppService, SignupServices, PrismaService, LoginServices],
})
export class AppModule { }
