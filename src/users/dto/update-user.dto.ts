import { CreateUserZ } from "./create-user.dto";
import { createZodDto } from "@anatine/zod-nestjs";

export const UpdateUserZ = CreateUserZ;

export class UpdateUserDto extends createZodDto(
  UpdateUserZ.omit({ id: true, password: true }),
) {}
