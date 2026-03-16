import { z } from "zod";
import { CreateCategoryBodySchema, UpdateCategoryBodySchema } from "./category.schema";

const postTitleField = z.string().min(1, "Title is required").max(200, "Title must be at most 200 characters");

const postContentField = z.string().min(1, "Content is required");

const PostParamsSchema = z.object({
  id: z.string(),
});

export const CreatePostBodySchema = z.object({
  title: postTitleField,
  content: postContentField,
  categories: z.array(CreateCategoryBodySchema).min(1),
});

export const GetPostsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(6).default(6),
  categories: z
    .preprocess((value) => {
      if (Array.isArray(value)) {
        return value;
      } else if (typeof value === "string") {
        return value.split(",").map((v) => v.trim());
      } else {
        return undefined;
      }
    }, z.array(z.string()))
    .optional(),
});

export const GetPostParamsSchema = PostParamsSchema;

export const UpdatePostParamsSchema = PostParamsSchema;

export const UpdatePostBodySchema = z.object({
  title: postTitleField.optional(),
  content: postContentField.optional(),
  categories: z.array(UpdateCategoryBodySchema).min(1).optional(),
});

export const DeletePostParamsSchema = PostParamsSchema;
