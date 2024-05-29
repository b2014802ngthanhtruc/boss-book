import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        id: createUserDto.id,
        username: createUserDto.username,
        password: passwordHash,
        email: createUserDto.email,
        phone: createUserDto.phone,
        address: createUserDto.address,
        is_admin: createUserDto.is_admin,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
        username: updateUserDto.username,
        is_admin: updateUserDto.is_admin,
      },
    });
  }

  async remove(id: string): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
