import { clearAuthCookie } from "~~/server/utils/http/auth/cookie";
import { defineController } from "~~/server/utils/http/controller";

export default defineController(async (event) => {
  clearAuthCookie(event);
});
