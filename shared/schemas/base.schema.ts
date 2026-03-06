import { z } from "zod";

const baseFirstNameField = z.string();
const baseLastNameField = z.string().optional();
const baseUsernameField = z.string();
const basePasswordField = z.string();

export { baseFirstNameField, baseLastNameField, basePasswordField, baseUsernameField };
