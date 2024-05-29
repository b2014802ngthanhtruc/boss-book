import { createZodDto } from "@anatine/zod-nestjs";
import { CreateUserZ } from "src/users/dto/create-user.dto";

export class SignUpDto extends createZodDto(
  CreateUserZ.omit({
    is_admin: true,
  }),
) {}
