import { LoginBodySchema } from "~~/shared/schemas/auth.schema";
import { authService } from "../../services/auth.service";
import { setAuthCookie } from "../../utils/http/auth/cookie";
import { defineController } from "../../utils/http/controller";
import { validateBody } from "../../utils/http/validation";

export default defineController(async (event) => {
  const body = await validateBody(event, LoginBodySchema);

  const token = await authService.login(body);
  setAuthCookie(event, token);
});
