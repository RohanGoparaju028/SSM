import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { User, Prisma } from './generated/prisma/client.js';
import { bcrypt } from 'bcrypt';



async function encryptPassword(password: string): Promise<string> {
   let hashPasword = await bcrypt.hash(password, 10);
   return hashPasword;
}

@Injectable()
export class SignupServices {
   constructor(private prisma: PrismaService) {
   }
   async SignUp(firstName: string, lastName: string, email: string, password: string, age: number, gender: string): Promise<User | Error> {
      try {
         let encryptedPassword: string = await encryptPassword(password);
         const newUser = await this.prisma.user.create({
            data: {
               FirstName: firstName,
               LastName: lastName,
               Email: email,
               Password: encryptedPassword,
               Age: age,
               Gender: gender
            },
         });
         return newUser;
      } catch (error) {
         if (error.code == 'P2002') {
            throw new Error('Email Already exist');
         }
         throw new Error("Internal Server Exception");
      }
   }
}