import { userService } from "~~/server/services/user.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";

export default defineProtectedController(async (event) => {
  return userService.deleteById(event.context.user.id);
});
