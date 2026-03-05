import { authService } from "~~/server/services/auth.service";
import { setAuthCookie } from "~~/server/utils/http/auth/cookie";
import { defineController } from "~~/server/utils/http/controller";
import { validateBody } from "~~/server/utils/http/validation";
import { LoginBodySchema } from "~~/server/utils/schemas/auth.schema";

export default defineController(async (event) => {
  const body = await validateBody(event, LoginBodySchema);

  const token = await authService.login(body);
  setAuthCookie(event, token);
});
