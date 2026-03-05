import { z } from "zod";

export const LoginBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const RegisterBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  username: z.string(),
  password: z.string(),
});
