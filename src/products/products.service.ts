/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductEntity } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: CreateProductDto): Promise<ProductEntity> {
    const result = await this.prisma.product.create({
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
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    return {
      id: product.id,
      name: product.name,
      author: product.author,
      description: product.description,
      quantity: product.quantity,
      sold: product.sold,
      price: product.price,
      img: product.img,
      categories: result.categories.map((categoryRelation) => ({
        id: categoryRelation.category.id,
        name: categoryRelation.category.name,
      })),
    };
  }

  async findAll(): Promise<ProductEntity[]> {
    const listProduct = await this.prisma.product.findMany({
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    const result: ProductEntity[] = listProduct.map((product) => ({
      id: product.id,
      name: product.name,
      author: product.author,
      description: product.description,
      quantity: product.quantity,
      sold: product.sold,
      price: product.price,
      img: product.img,
      categories: product.categories.map((categoryRelation) => ({
        id: categoryRelation.category.id,
        name: categoryRelation.category.name,
      })),
    }));

    return result;
  }

  async findOne(id: string): Promise<ProductEntity> {
    const result = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    return {
      id: result.id,
      name: result.name,
      author: result.author,
      description: result.description,
      img: result.img,
      price: result.price,
      quantity: result.quantity,
      sold: result.sold,
      categories: result.categories.map((categoryRelation) => ({
        id: categoryRelation.category.id,
        name: categoryRelation.category.name,
      })),
    };
  }

  async update(
    id: string,
    { categories, ...product }: UpdateProductDto,
  ): Promise<ProductEntity> {
    await this.prisma.productOfCategory.deleteMany({
      where: {
        productId: id,
      },
    });

    const result = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...product,
        categories: {
          create: categories.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return {
      ...result,
      categories: result.categories.map((categoryRelation) => ({
        id: categoryRelation.category.id,
        name: categoryRelation.category.name,
      })),
    };
  }

  async remove(id: string): Promise<ProductEntity> {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id,
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
    return {
      id: deletedProduct.id,
      name: deletedProduct.name,
      author: deletedProduct.author,
      description: deletedProduct.description,
      quantity: deletedProduct.quantity,
      sold: deletedProduct.sold,
      price: deletedProduct.price,
      img: deletedProduct.img,
      categories: deletedProduct.categories.map((categoryRelation) => ({
        id: categoryRelation.category.id,
        name: categoryRelation.category.name,
      })),
    };
  }
}
