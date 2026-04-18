import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service.js'
import { Product, Prisma } from '@prisma/client';
@Injectable()
export class ProductServices {
  constructor(private prisma: PrismaService) { }

  async StoreProducts(userId: number, productName: string, productQuantity: number, expirtyDate: Date | undefined): Promise<{ message: string, statusCode: number }> {
    try {
      const _ = await this.prisma.product.create(
        {
          data: {
            userId: userId,
            productName: productName,
            productQuantity: productQuantity,
            expiryDate: expirtyDate
          }
        });
      return { message: "The products are successfully stored ", statusCode: 303 }
    } catch (error) {
      if (error == 'P2002') {
        throw new ConflictException("2 or more products have same name");
      }
      throw new InternalServerErrorException("We cannot process your request at the moment");
    }
  }
}