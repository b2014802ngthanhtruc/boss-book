import { User } from "@prisma/client";

export class UserEntity implements User {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}
