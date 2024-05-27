import { Module } from '@nestjs/common';
import { ProductController } from 'src/controller/product.controller';
import { ProductService } from 'src/service/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
