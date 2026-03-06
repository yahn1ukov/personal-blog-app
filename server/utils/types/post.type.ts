import { Prisma } from "~~/prisma/generated/client";
import type { CreateCategoryPayload, UpdateCategoryPayload } from "./category.type";

export interface CreatePostPayload {
  title: string;
  slug: string;
  content: string;
  coverImageURL?: string;
  categories: CreateCategoryPayload[];
}

export type UpdatePostPayload = Partial<
  Omit<CreatePostPayload, "categories"> & {
    categories: UpdateCategoryPayload[];
  }
>;

export type PostWithRelationsPayload = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    slug: true;
    content: true;
    coverImageURL: true;
    createdAt: true;
    author: {
      select: {
        firstName: true;
        lastName: true;
        avatarImageURL: true;
      };
    };
    categories: {
      select: {
        name: true;
        slug: true;
      };
    };
  };
}>;
