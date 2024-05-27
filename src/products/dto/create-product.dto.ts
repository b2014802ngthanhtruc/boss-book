export class CreateProductDto {
  id: string;
  name: string;
  author: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  img: string[];
  categories: number[];
}
