import { z } from "zod";

const categoryNameField = z
  .string()
  .min(1, "Category name is required")
  .max(50, "Category name must be at most 50 characters");

export const CreateCategoryBodySchema = z.object({
  name: categoryNameField,
});

export const UpdateCategoryBodySchema = z.object({
  name: categoryNameField,
});
