import { z } from "zod";
import { CreatePostBodySchema } from "../schemas/post.schema";
import type { FileMetadata } from "../types/file.type";
import type { CategoryDto } from "./category.dto";
import type { UserDto } from "./user.dto";

export interface PostDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageURL: string | null;
  author: Omit<UserDto, "id" | "createdAt">;
  categories: CategoryDto[];
  createdAt: Date;
}

export interface GetPostsQueryDto {
  page?: number;
  limit?: number;
  categories?: string[];
}

export type CreatePostRequestDto = z.infer<typeof CreatePostBodySchema> & {
  coverImage?: FileMetadata;
};

export type GetPostsResponseDto = PostDto[];

export type GetPostResponseDto = PostDto;

export type UpdatePostRequestDto = Partial<CreatePostRequestDto>;
