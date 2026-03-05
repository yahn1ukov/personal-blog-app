import { z } from "zod";

export const UpdateUserBodySchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
});

export const UpdateUserPasswordBodySchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
  })
  .refine((data) => data.oldPassword !== data.newPassword);
