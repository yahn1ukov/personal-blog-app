import { userService } from "~~/server/services/user.service";
import { clearAuthCookie } from "~~/server/utils/http/auth/cookie";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";
import { validateBody } from "~~/server/utils/http/validation";
import { UpdateUserPasswordBodySchema } from "~~/server/utils/schemas/user.schema";

export default defineProtectedController(async (event) => {
  const body = await validateBody(event, UpdateUserPasswordBodySchema);

  await userService.updatePasswordById(event.context.user.id, body);
  clearAuthCookie(event);
});
