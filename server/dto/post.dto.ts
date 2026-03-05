import { z } from "zod";
import { CreatePostBodySchema } from "../utils/schemas/post.schema";
import type { FileMetadata } from "../utils/types/file.type";
import type { CategoryDto } from "./category.dto";
import type { UserDto } from "./user.dto";

export interface PostDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageURL: string | null;
  author: Omit<UserDto, "id" | "username" | "createdAt">;
  categories: CategoryDto[];
  createdAt: string;
}

export interface GetPostsQueryDto {
  page?: number;
  limit?: number;
  categories?: string[];
}

export interface GetPostsResponseDto {
  total: number;
  pages: number;
  posts: Omit<PostDto, "author">[];
}

export type CreatePostRequestDto = z.infer<typeof CreatePostBodySchema> & {
  coverImage?: FileMetadata;
};

export type GetPostResponseDto = PostDto;

export type UpdatePostRequestDto = Partial<CreatePostRequestDto>;
