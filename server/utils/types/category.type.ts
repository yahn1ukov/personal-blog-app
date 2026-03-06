import { Prisma } from "~~/prisma/generated/client";

export type CategoryPayload = Prisma.CategoryGetPayload<{
  select: {
    name: true;
    slug: true;
  };
}>;

export type CreateCategoryPayload = CategoryPayload;

export type UpdateCategoryPayload = CreateCategoryPayload;
