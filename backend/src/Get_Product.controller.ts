import { Body, Controller, Post } from '@nestjs/common';
import { StoreProducts } from './Get_Product.services';
@Controller('products')
export class AddProductController {
    constructor(private readonly storeProducts: StoreProducts) { }

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
}
