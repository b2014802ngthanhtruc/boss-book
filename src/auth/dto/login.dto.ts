import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

const loginUserZ = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 character"),
  })
  .required();

export class LoginUserDto extends createZodDto(loginUserZ) {}
