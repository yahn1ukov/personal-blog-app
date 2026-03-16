import { RegisterBodySchema } from "~~/shared/schemas";
import { authService } from "../../services/auth.service";
import { setAuthCookie } from "../../utils/http/auth/cookie";
import { defineController } from "../../utils/http/controller";
import { validateBody } from "../../utils/http/validation";

export default defineController(async (event) => {
  const body = await validateBody(event, RegisterBodySchema);

  const token = await authService.register(body);
  setAuthCookie(event, token);
});
