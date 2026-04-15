import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUP } from './signup.controller';
import { SignupServices } from './signup.services';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, SignUP],
  providers: [AppService, SignupServices, PrismaService],
})
export class AppModule { }
