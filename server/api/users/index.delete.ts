import { userService } from "../../services/user.service";
import { defineProtectedController } from "../../utils/http/auth/protected-controller";

export default defineProtectedController(async (event) => {
  return userService.deleteById(event.context.user.id);
});
