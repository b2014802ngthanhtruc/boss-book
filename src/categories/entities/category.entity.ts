/* eslint-disable prettier/prettier */
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: number;
  name: string;
}
