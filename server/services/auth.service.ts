import type { GetAuthUserResponseDto, LoginRequestDto, RegisterRequestDto } from "~~/shared/dto/auth.dto";
import { userRepository } from "../repositories/user.repository";
import { UnauthorizedError } from "../utils/errors";
import { hashPassword, verifyPassword } from "../utils/http/auth/hash";
import { generateToken } from "../utils/http/auth/jwt";
import { AuthMapper } from "../utils/mappers/auth.mapper";

class AuthService {
  async login(dto: LoginRequestDto): Promise<string> {
    const user = await userRepository.findByIdOrUsername(dto.username);
    if (!user || !(await verifyPassword(user.password, dto.password))) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return generateToken(user.id);
  }

  async register(dto: RegisterRequestDto): Promise<string> {
    const hashedPassword = await hashPassword(dto.password);
    const createdUser = await userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return generateToken(createdUser.id);
  }

  async getMe(userId: string): Promise<GetAuthUserResponseDto> {
    const user = await userRepository.getByIdOrUsername(userId);

    return AuthMapper.toDto(user);
  }
}

export const authService = new AuthService();
