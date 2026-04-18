import { Body, Post, Controller } from '@nestjs/common';
import { Product } from './DTO/Product.dto'
import { ProductServices } from './Home.services';


@Controller("Home")
export class ProductController {
    constructor(private products: ProductServices) { }
    @Post()
    async insertProduct(@Body() product) {
        let result = await this.products.StoreProducts(product.userId, product.productName, product.productQuantity, product.expiryDate);
        return result;
    }
}