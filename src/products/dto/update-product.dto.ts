/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: string;
  name: string;
  author: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  img: string[];
}
