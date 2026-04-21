import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUP } from './signup.controller';
import { SignupServices } from './signup.services';
import { PrismaService } from './prisma.service';
import { LoginController } from './login.controller';
import { LoginServices } from './login.services';
import { ProductServices } from './Home.services';
import { ProductController } from './Home.controller'
import { StoreProducts } from './Get_Product.services';
import { AddProductController } from './Get_Product.controller';
import { ExpiryItems } from './EmailServices/SendEmail.Services';

@Module({
  imports: [],
  controllers: [AppController, SignUP, LoginController, ProductController, AddProductController],
  providers: [AppService, SignupServices, PrismaService, LoginServices, ProductServices, StoreProducts, ExpiryItems],
})
export class AppModule { }
