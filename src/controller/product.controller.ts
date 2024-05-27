import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): string {
    return this.productService.findAll();
  }
}
