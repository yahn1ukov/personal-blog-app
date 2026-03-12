import type { GetAuthUserResponseDto } from "~~/shared/dto/auth.dto";
import { formatImageURL } from "../formatters";
import type { UserPayload } from "../types/user.type";

export class AuthMapper {
  static toDto(user: UserPayload): GetAuthUserResponseDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatarImageURL: formatImageURL(user.avatarImageURL),
    };
  }
}
