import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class StoreProducts {
    constructor(private prisma: PrismaService) { }

    async storeProduct(userId: number, barcode: string, productname: string, brands: string | undefined, productQuantity: number, expiryDate: Date | undefined, updatedOn: Date | undefined): Promise<{ message: string, statusCode: number }> {
        try {
            const user = await this.prisma.product.create({
                data: {
                    userId: userId,
                    barcode: barcode,
                    productName: productname,
                    brands: brands,
                    productQuantity: productQuantity,
                    expiryDate: expiryDate,
                    updatedOn: updatedOn
                }
            });
            return { message: "Products are inserted successfully", statusCode: 201 };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException("The products of the barcode has already entered");
            }
            console.error("Prisma Error:", error); // This will show the real problem in your terminal
            throw new InternalServerErrorException("We are experincing an internal problem try again later");
        }
    }
}