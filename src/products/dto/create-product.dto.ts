import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const CreateProductZ = z
  .object({
    id: z.string().length(7, "id phải có ít nhất 7 ký tự"),
    name: z.string().min(1),
    author: z.string().min(1).max(50),
    description: z.string().min(10),
    quantity: z.number().nonnegative("Số lượng phải lớn hơn hoặc bằng 0"),
    price: z.number().min(1000, "Giá của sản phẩm phải có giá trị từ 1000"),
    sold: z.number(),
    img: z.array(z.string()).nonempty("Sản phẩm phải có ảnh"),
    categories: z.array(z.number()).nonempty("Sản phẩm phải có thể loại"),
  })
  .required();

export class CreateProductDto extends createZodDto(CreateProductZ) {}
