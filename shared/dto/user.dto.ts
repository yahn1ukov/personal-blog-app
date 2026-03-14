import { z } from "zod";
import { UpdateUserBodySchema, UpdateUserPasswordBodySchema } from "../schemas/user.schema";
import type { FileMetadata } from "../types/file.type";

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

export type UpdateUserResponseDto = void;

export type UpdatePasswordRequestDto = z.infer<typeof UpdateUserPasswordBodySchema>;

export type UpdatePasswordResponseDto = void;

export type DeleteUserResponseDto = void;

export type UpdateUserAndPasswordRequestDto = Omit<UpdateUserRequestDto, "avatarImage"> & {
  avatarImage: File | null;
} & UpdatePasswordRequestDto;
