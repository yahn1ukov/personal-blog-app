import type { UpdatePasswordRequestDto, UpdateUserRequestDto } from "~~/shared/dto/user.dto";
import { userRepository } from "../repositories/user.repository";
import { FILE_TYPE } from "../utils/constants/file.constant";
import { BadRequestError } from "../utils/errors";
import { hashPassword, verifyPassword } from "../utils/http/auth/hash";
import { fileService } from "./file.service";

class UserService {
  async updateById(id: string, dto: UpdateUserRequestDto): Promise<void> {
    const { avatarImage, ...data } = dto;

    const avatarImageURL = avatarImage && (await fileService.upload(id, FILE_TYPE.AVATAR, avatarImage));

    return userRepository.updateById(id, {
      ...data,
      avatarImageURL,
    });
  }

  async updatePasswordById(id: string, dto: UpdatePasswordRequestDto): Promise<void> {
    const user = await userRepository.findByIdOrUsername(id);
    if (!user || !(await verifyPassword(user.password, dto.oldPassword))) {
      throw new BadRequestError("Invalid password");
    }

    const hashedPassword = await hashPassword(dto.newPassword);

    return userRepository.updatePasswordById(id, hashedPassword);
  }

  async deleteById(id: string): Promise<void> {
    return userRepository.deleteById(id);
  }
}

export const userService = new UserService();
