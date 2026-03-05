import { userService } from "~~/server/services/user.service";
import { defineProtectedController } from "~~/server/utils/http/auth/protected-controller";
import { validateMultipartFormData } from "~~/server/utils/http/validation";
import { UpdateUserBodySchema } from "~~/server/utils/schemas/user.schema";

export default defineProtectedController(async (event) => {
  const body = await validateMultipartFormData(event, UpdateUserBodySchema);

  const { image, ...data } = body;

  return userService.updateById(event.context.user.id, {
    ...data,
    avatarImage: image,
  });
});
