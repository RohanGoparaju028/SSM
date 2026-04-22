import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { StoreProducts } from './Get_Product.services';
@Controller('products')
export class AddProductController {
    constructor(private readonly storeProducts: StoreProducts, private prisma: PrismaService) { }

    @Post('add')
    async addProduct(@Body() productData: any) {
        return this.storeProducts.storeProduct(
            productData.userId,
            productData.barcode,
            productData.productName,
            productData.brands,
            productData.productQuantity,
            productData.expiryDate,
            productData.updatedOn
        );
    }
    @Get("product/:id")
    async getProduct(@Param() id: number) {
        const genproduct = await this.prisma.product.findMany({
            where: { userId: id },
            include: { history: true }
        }
        );
        return genproduct;
    }
}

