import { authService } from "../../services/auth.service";
import { defineProtectedController } from "../../utils/http/auth/protected-controller";

export default defineProtectedController(async (event) => {
  return authService.getMe(event.context.user.id);
});
