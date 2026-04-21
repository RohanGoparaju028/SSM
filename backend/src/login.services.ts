import { Injectable, InternalServerErrorException, BadRequestException, HttpException } from '@nestjs/common'
import { PrismaService } from './prisma.service.js';
import * as  bcrypt from 'bcrypt';
@Injectable()
export class LoginServices {
    constructor(private prisma: PrismaService) { }

    async Login(email: string, password: string): Promise<{ message: string, statuscode: number, userId?: number }> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { Email: email },
            });


            if (!user) {
                throw new BadRequestException("Cannot find the email in our database please check again");
            }
            let storedPassword = await bcrypt.compare(password, user.Password);
            if (storedPassword) {
                return { message: "User exist", statuscode: 302, userId: user.Id };
            } else {
                return { message: "Wrong Password", statuscode: 401 };
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Cannot verify the login at this moement");
        }
    }
}