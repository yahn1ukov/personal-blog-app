import { z } from "zod";

const baseFirstNameField = z
  .string()
  .min(1, "First name is required")
  .max(50, "First name must be at most 50 characters");

const baseLastNameField = z.string().max(50, "Last name must be at most 50 characters").optional();

const baseUsernameField = z
  .string()
  .min(1, "Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be at most 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores");

const basePasswordField = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be at most 100 characters");

export { baseFirstNameField, baseLastNameField, basePasswordField, baseUsernameField };
