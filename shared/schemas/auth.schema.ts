import { z } from "zod";
import { baseFirstNameField, baseLastNameField, basePasswordField, baseUsernameField } from "./base.schema";

export const LoginBodySchema = z.object({
  username: baseUsernameField,
  password: basePasswordField,
});

export const RegisterBodySchema = z.object({
  firstName: baseFirstNameField,
  lastName: baseLastNameField,
  username: baseUsernameField,
  password: basePasswordField,
});
