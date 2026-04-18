import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException, BadRequestException, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const Organizationemail: string = ''; // This is not created at

@Injectable()
export class ExpiryItems {
    constructor(private mail: MailerService, private prisma: PrismaService) { }
    async expiryEmail(email: string, Item: string): Promise<void> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { Email: email }
            });
            if (!user) {
                throw new BadRequestException("We cannot find the entered email please verfiy the entered email");
            }
            const message: string = Item + " is going to expire today if you are free today please buy it";
            await this.mail.sendMail({
                from: Organizationemail,
                to: email,
                subject: "News about " + Item,
                text: message
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Cannot verify Email right now");
        }
    }
    async AboutToFinish(email: string, Item: string, currentQuantity: number): Promise<void> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { Email: email }
            });
            if (!user) {
                throw new BadRequestException("Cannot find your email please verify it");
            }
            const message: string = "Currently the " + Item + " has " + currentQuantity.toString() + " in the house and about to finish";
            await this.mail.sendMail({
                from: Organizationemail,
                to: email,
                subject: "News about " + Item,
                text: message
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Cannot verify your email");
        }
    }
}