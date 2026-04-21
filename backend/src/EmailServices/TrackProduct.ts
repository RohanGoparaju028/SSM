/*
Right now the strategy that I came up for having to track the purchase is from the front
end for n starting from 0 and after every n iterations the website prompts you question making 
the model the most updated information to make an appropriate prediction.
*/
import { Injectable, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js'
import { ExpiryItems } from './SendEmail.Services';
const defualtQuantity = 4;
const time: Date = new Date()
@Injectable()
export class TrackProduct {
    constructor(private prisma: PrismaService, private items: ExpiryItems) { }
    async doTracking(@Body() userId: number): Promise<void> {
        try {
            const productDetails = await this.prisma.product.findUnique({
                where: { userId: userId },
                select: { productName: true, productQuantity: true, expiryDate: true }
            });
            const email = await this.prisma.user.findUnique({
                where: { Id: userId },
                select: { Email: true }
            })
            if (productDetails?.productQuantity != undefined && productDetails?.productQuantity < defualtQuantity) {

                await this.items.AboutToFinish(email!.Email, productDetails.productName, productDetails?.productQuantity);
            }
            if (productDetails != null && productDetails.expiryDate != null && productDetails.expiryDate === time) {
                await this.items.expiryEmail(email!.Email, productDetails.productName);
            }
        } catch (error) {

        }
    }
}