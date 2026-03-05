import { authService } from "~~/server/services/auth.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";

export default defineProtectedController(async (event) => {
  return authService.getMe(event.context.user.id);
});
