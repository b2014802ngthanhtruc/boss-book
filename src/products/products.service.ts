/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    categories,
    ...product
  }: CreateProductDto): Promise<ProductEntity> {
    return await this.prisma.product.create({
      data: {
        ...product,
        categories: {
          connect: categories.map((id) => ({ id })), // kết nối tới các danh mục theo ID
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.prisma.product.findMany({
      include: {
        categories: true,
      },
    });
  }

  async findOne(id: string): Promise<ProductEntity> {
    return await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
    });
  }

  async update(id: string, product: UpdateProductDto): Promise<ProductEntity> {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        categories: {
          deleteMany: {},
        },
      },
    });

    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        id: product.id,
        name: product.name,
        author: product.author,
        description: product.description,
        quantity: product.quantity,
        sold: product.sold,
        price: product.price,
        img: product.img,
        categories: {
          connect: product.categories.map((id) => ({ id })), // kết nối tới các danh mục theo ID
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async remove(id: string): Promise<ProductEntity> {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
    });
    return deletedProduct;
  }
}
