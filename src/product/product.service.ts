/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ProductType {
  id: string;
  name: string;
  author: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
}

@Injectable()
export class ProductService {
  constructor(readonly prisma: PrismaService) { }
  async getProduct(): Promise<ProductType[]> {
    return await this.prisma.product.findMany();
  }

  async createProduct(product: ProductType): Promise<ProductType> {
    return await this.prisma.product.create({
      data: {
        ...product,
      },
    });
  }
}
