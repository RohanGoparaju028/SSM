import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


async function encryptPassword(password: string): Promise<string> {
   let hashPasword = await bcrypt.hash(password, 10);
   return hashPasword;
}

@Injectable()
export class SignupServices {
   constructor(private prisma: PrismaService) {
   }
   async SignUp(firstName: string, lastName: string, email: string, password: string, age: number, gender: string): Promise<{ message: string, statuscode: number, userId?: number }> {
      try {
         let encryptedPassword: string = await encryptPassword(password);
          const user = await this.prisma.user.create({
            data: {
               FirstName: firstName,
               LastName: lastName,
               Email: email,
               Password: encryptedPassword,
               Age: age,
               Gender: gender
            },
         });
         return { message: 'Successfully regesterd', statuscode: 303, userId: user.Id };
      } catch (error) {
         console.error("DEBUG ERROR:", error)
         if (error.code == 'P2002') {
            throw new ConflictException('Email Already exist');
         }
         throw new InternalServerErrorException("Internal Server Exception");
      }
   }
}