import { z } from "zod";
import { baseFirstNameField, baseLastNameField, basePasswordField, baseUsernameField } from "./base.schema";

export const UpdateUserBodySchema = z.object({
  firstName: baseFirstNameField.optional(),
  lastName: baseLastNameField,
  username: baseUsernameField.optional(),
});

export const UpdateUserPasswordBodySchema = z
  .object({
    oldPassword: basePasswordField,
    newPassword: basePasswordField,
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });
