import { clearAuthCookie } from "../../utils/http/auth/cookie";
import { defineController } from "../../utils/http/controller";

export default defineController(async (event) => {
  clearAuthCookie(event);
});
