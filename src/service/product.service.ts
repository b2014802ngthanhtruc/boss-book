import { Injectable } from '@nestjs/common';
//mport { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
  findAll(): string {
    return 'find all product';
  }
}
