import { z } from "zod";
import { UpdateUserBodySchema, UpdateUserPasswordBodySchema } from "../utils/schemas/user.schema";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string | null;
  username: string;
  avatarImageURL: string | null;
  createdAt: string;
}

export type UpdateUserRequestDto = z.infer<typeof UpdateUserBodySchema> & {
  avatarImage?: FileMetadata;
};

export type UpdatePasswordRequestDto = z.infer<typeof UpdateUserPasswordBodySchema>;
