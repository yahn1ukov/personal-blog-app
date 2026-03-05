import { Prisma } from "~~/prisma/generated/client";

export type Category = Prisma.CategoryGetPayload<{
  select: {
    name: true;
    slug: true;
  };
}>;

export type CreateCategoryPayload = Category;

export type UpdateCategoryPayload = CreateCategoryPayload;
