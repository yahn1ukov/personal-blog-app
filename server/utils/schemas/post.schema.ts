import { z } from "zod";
import { CreateCategoryBodySchema, UpdateCategoryBodySchema } from "./category.schema";

const PostParamsSchema = z.object({
  id: z.string(),
});

export const CreatePostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  categories: z.array(CreateCategoryBodySchema).min(1),
});

export const GetPostsQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(20).optional().default(10),
  categories: z
    .preprocess((value) => typeof value === "string" && value.split(",").map((v) => v.trim()), z.array(z.string()))
    .optional(),
});

export const GetPostParamsSchema = PostParamsSchema;

export const UpdatePostParamsSchema = PostParamsSchema;

export const UpdatePostBodySchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  categories: z.array(UpdateCategoryBodySchema).min(1).optional(),
});

export const DeletePostParamsSchema = PostParamsSchema;
