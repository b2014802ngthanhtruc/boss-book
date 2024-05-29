import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const CreateUserZ = z.object({
  id: z.string().min(8, "id must be 8 characters"),
  username: z.string().min(5, "Name must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\b(09|08|03|02)\d{8}\b$/, "Invalid phone number"),
  address: z.string(),
  is_admin: z.boolean(),
});

export class CreateUserDto extends createZodDto(CreateUserZ) {}
