import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findEmail(data.email);
    const passwordVerified = await bcrypt.compare(data.password, user.password);
    if (!passwordVerified) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: SignUpDto): Promise<boolean> {
    const payload: CreateUserDto = {
      ...data,
      is_admin: false,
    };
    const result = await this.userService.create(payload);
    if (result != null) {
      return true;
    }
    return false;
  }
}
