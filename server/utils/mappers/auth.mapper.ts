import type { GetAuthUserResponseDto } from "~~/server/dto/auth.dto";
import { formatImageURL } from "../formatters";
import type { User } from "../types/user.type";

export class AuthMapper {
  static toDto(user: User): GetAuthUserResponseDto {
    return {
      username: user.username,
      avatarImageURL: formatImageURL(user.avatarImageURL),
    };
  }
}
