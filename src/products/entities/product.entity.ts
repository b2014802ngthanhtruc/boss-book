import { Product } from '@prisma/client';
import { CategoryEntity } from 'src/categories/entities/category.entity';
//import { CategoryEntity } from 'src/categories/entities/category.entity';

export class ProductEntity implements Product {
  id: string;
  name: string;
  author: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  img: string[];
  categories: CategoryEntity[];
}
