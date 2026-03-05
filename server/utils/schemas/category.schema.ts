import { z } from "zod";

export const CreateCategoryBodySchema = z.object({
  name: z.string(),
});

export const UpdateCategoryBodySchema = CreateCategoryBodySchema;
