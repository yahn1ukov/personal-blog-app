import { UpdateUserPasswordBodySchema } from "~~/shared/schemas";
import { userService } from "../../services/user.service";
import { clearAuthCookie } from "../../utils/http/auth/cookie";
import { defineProtectedController } from "../../utils/http/auth/protected-controller";
import { validateBody } from "../../utils/http/validation";

export default defineProtectedController(async (event) => {
  const body = await validateBody(event, UpdateUserPasswordBodySchema);

  await userService.updatePasswordById(event.context.user.id, body);
  clearAuthCookie(event);
});
