import { z } from "zod";
import { LoginBodySchema, RegisterBodySchema } from "../schemas/auth.schema";
import type { UserDto } from "./user.dto";

export type LoginRequestDto = z.infer<typeof LoginBodySchema>;

export type RegisterRequestDto = z.infer<typeof RegisterBodySchema>;

export type GetAuthUserResponseDto = Omit<UserDto, "id" | "createdAt">;
