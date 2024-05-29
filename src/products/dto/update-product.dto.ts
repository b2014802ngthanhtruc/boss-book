/* eslint-disable prettier/prettier */
import { CreateProductZ } from "./create-product.dto";
import { createZodDto } from "@anatine/zod-nestjs";

export const UpdateProductZ = CreateProductZ;

export class UpdateProductDto extends createZodDto(
  UpdateProductZ.omit({ id: true }),
) {}
